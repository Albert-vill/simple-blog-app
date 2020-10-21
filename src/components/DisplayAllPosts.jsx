import React, {useState, useRef} from 'react'
import CreateNewPost from './CreateNewPost'
import ModifyPost from './ModifyPost';
import Post from './Post';

const DisplayAllPosts = () =>{
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [allPost, setAllPost] = useState([]);
    const [isCreateNewPost, setIsCreateNewPost] = useState(false);
    const [isModifyPost, setIsModifyPost] = useState(false);
    const [editPostId, setEditPostId] = useState("");

    const getTitle = useRef();
    const getContent = useRef();

    const savePostTitleToState = event => {
        setTitle(event.target.value);
    };

    const savePostContentToState = event => {
        setContent(event.target.value);
    };

    const toggleCreateNewPost = () => {
        setIsCreateNewPost(!isCreateNewPost)
    }

    const toggleModifyPost = () => {
        setIsModifyPost(!isModifyPost)
    }

    const editPost = id =>{
        setEditPostId(id);
        toggleModifyPost();
        console.log(id);
    }

    const deletePost = id =>{
        const modifiedPost = allPost.filter(eachPost => {
            return eachPost.id != id;
        })
        setAllPost(modifiedPost);
    }

    const updatePost = (event) =>{
        event.preventDefault();
        const updatedPost = allPost.map(eachPost => {
            if (eachPost.id === editPostId){
                console.log([eachPost.id,editPostId])
                return {
                    ...eachPost,
                    title: title || eachPost.title,
                    content: content || eachPost.content
                };
            }
            console.log(eachPost)
            return eachPost;
        });
        setAllPost(updatedPost);
        toggleModifyPost();
    }

    const savePost = (event) =>{
        event.preventDefault();
        const id = Date.now();
        setAllPost([...allPost,{title,content,id}]);
        console.log(allPost);
        setTitle("");
        setContent("");
        getTitle.current.value="";
        getContent.current.value="";
        toggleCreateNewPost();
    }
    
    if(isCreateNewPost){
        return(
            <>
            <CreateNewPost 
            savePostTitleToState = {savePostTitleToState}
            savePostContentToState = {savePostContentToState}
            getTitle = {getTitle}
            getContent = {getContent}
            savePost={savePost}
            />
            </>
        );
    }else if(isModifyPost){
        const post = allPost.find(post => {
            return post.id===editPostId
        });
        return(
            <ModifyPost
                title ={post.title}
                content = {post.content}
                updatePost = {updatePost}
                savePostTitleToState = {savePostTitleToState}
                savePostContentToState = {savePostContentToState}
            />
        );
    }



    return (
        <>
        <h2>All Posts</h2>
        {!allPost.length ? (
            <div>The list of posts is empty!</div>
        ) : ( allPost.map(eachPost => {
                return (
                    <Post
                    id={eachPost.id}
                    key={eachPost.id}
                    title={eachPost.title}
                    content={eachPost.content}
                    editPost={editPost}
                    deletePost={deletePost}
                    />
                )
            })
            )}
        <br/>
        <br/>
        <button onClick={toggleCreateNewPost}>Create New</button>
        </>
    )
}

export default DisplayAllPosts;