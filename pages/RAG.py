import streamlit as st
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.llm import LLMChain
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains import RetrievalQA

load_dotenv()

# App title
st.set_page_config(page_title="Siphon", page_icon="🗿")

def load_and_split_documents(uploaded_file):
    # Save the uploaded file temporarily
    temp_file_path = "temp.pdf"
    with open(temp_file_path, "wb") as f:
        f.write(uploaded_file.getvalue())
    
    # Use PDFPlumberLoader to load the PDF
    loader = PDFPlumberLoader(temp_file_path)
    documents = loader.load()
    
    # Clean up the temporary file
    os.remove(temp_file_path)
    
    # Split the text into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    split_documents = text_splitter.split_documents(documents)
    
    return split_documents

@st.cache_data
def create_vector_store(_documents):
    # Use a faster embedding model
    embedder = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector = FAISS.from_documents(_documents, embedder)
    return vector

st.title("Siphon Knowledge")
st.write("**Siphon Knowledge uses Retrieval Augmented Generation to give accurate results!**")
st.link_button("Learn about RAG here", "https://www.ibm.com/think/topics/retrieval-augmented-generation")

uploaded_file = st.file_uploader("Upload your material here", type="pdf")

if uploaded_file is not None:
    st.success("PDF uploaded successfully!")

    with st.spinner("📚 Splitting the document into chunks..."):
        documents = load_and_split_documents(uploaded_file)

    with st.spinner("🔍 Creating vector store..."):
        vector = create_vector_store(documents)
        retriever = vector.as_retriever(search_type="similarity", search_kwargs={"k": 3})

    # Initialize LLM
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

    prompt = """
    Use the following context to answer the question. Make sure you base your answer on the context and nothing but the context.
    Context: {context}
    Question: {question}
    Answer:"""
    QA_PROMPT = PromptTemplate.from_template(prompt)

    user_input = st.chat_input("Ask a question about your document:")
    if user_input:
        with st.spinner("🤖 Generating response..."):
            llm_chain = LLMChain(llm=llm, prompt=QA_PROMPT)
            combine_documents_chain = StuffDocumentsChain(llm_chain=llm_chain, document_variable_name="context")
            qa = RetrievalQA(combine_documents_chain=combine_documents_chain, retriever=retriever)
            result = qa(user_input)
            query = result["query"]
            response = result["result"]

        st.write("**Query:**")
        st.write(query)
        st.write("**Response:**")
        st.write(response)