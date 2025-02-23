import streamlit as st
import os
from langchain_community.document_loaders import PDFPlumberLoader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain


# App title
st.set_page_config(page_title="Siphon", page_icon="🗿")
st.title("Siphon Knowledge")
st.write("**Siphon Knowledge uses Retrieval Augmented Generation to give accurate and fast results!**")
st.session_state.gemini_api_key = st.text_input("Enter Gemini API",type="password")

def load_and_split_documents(uploaded_files):
    all_docs = []
    for uploaded_file in uploaded_files:
        temp_file_path = f"temp_{uploaded_file.name}"
        with open(temp_file_path, "wb") as f:
            f.write(uploaded_file.getvalue())
        
        loader = PDFPlumberLoader(temp_file_path)
        docs = loader.load()
        all_docs.extend(docs)
        os.remove(temp_file_path)
    
    # Split the text into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, add_start_index=True)
    split_documents = text_splitter.split_documents(all_docs)
    return split_documents

@st.cache_data
def createVectorStore(_documents):
    # turns documents into embeddings and stores in a vector (FAISS)
    embedder = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector = FAISS.from_documents(_documents, embedder)
    retriever = vector.as_retriever(search_type = "similarity", search_kwargs={"k" : 1})
    return retriever
    
def processDocuments():
    splittedDocuments = load_and_split_documents(st.session_state.sourceDocs)
    st.session_state.retriever = createVectorStore(splittedDocuments)

def queryLLM(retriever, query):
    llm = ChatGoogleGenerativeAI(api_key=st.session_state.gemini_api_key, model="gemini-2.0-flash")
    qa_chain = ConversationalRetrievalChain.from_llm( 
        llm=llm,
        retriever=retriever,
        return_source_documents=True  
    )
    result = qa_chain({'question' : query, 'chat_history' : st.session_state.messages})
    result = result['answer']
    st.session_state.messages.append((query, result))
    return result

def appStart():
    st.session_state.sourceDocs = st.file_uploader("Upload your material here", type="pdf", accept_multiple_files=True)
    st.button("Submit Documents", on_click=processDocuments)

    if "messages" not in st.session_state:
        st.session_state.messages = []

    for message in st.session_state.messages:
        st.chat_message('human').write(message[0])
        st.chat_message('ai').write(message[1])    

    if query := st.chat_input():
        st.chat_message("human").write(query)
        response = queryLLM(st.session_state.retriever, query)
        st.chat_message("ai").write(response)


if __name__ == '__main__':
    appStart()