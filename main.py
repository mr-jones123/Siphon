import streamlit as st
st.set_page_config(page_title="Home", page_icon="🗿")
st.title("🗿 Siphon")
st.subheader("Accuracy at best. For free.")
st.caption("Made by xy.")
st.write("""
        Siphon is your ultimate AI study buddy. You can use two versions of Siphon: \n
        
         1. chat: An LLM chatbot that is fine-tuned to help you study Computer Science concepts.
         2. rag: An AI that answers intelligently and accurately by uploading your source material to it.
    """)
st.divider()
st.subheader("Frequently Asked Questions")
st.markdown("""
    #### *When I use Siphon Knowledge (rag), does it store my data?*
    No, it does not. It only temporarily stores the file for the knowledge base of the AI. Once you exit the app,
    it will discard the file immediately.
            
    #### *What's the difference in terms of output between the two chatbots?*
    Siphon General (chat) serves as an easy access to information for general use. For example, you want to learn about the gist of Graph
    Theory without diving deep into its concepts. So, it will give you simple terms and explanation.\n
    Siphon Knowledge (rag) on the other hand, generates its replies based off the resources (pdf files) that you will upload. This will give you
    deterministic and accurate answers. 
""")    
st.divider()
st.html("""
                <span style="color:grey"> Siphon is made by xy. <a href="https://xy-profile.vercel.app" style="color:#989898"> Check him out!</a> </span>
            """)