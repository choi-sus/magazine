// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import {Grid} from "../elements";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state)=> state.post.list);
    const user_info = useSelector((state)=> state.user.user);

    React.useEffect(()=> {
        if(post_list.length === 0){
            dispatch(postActions.getPostFB());
        }
    }, [])
    
    return (
        <React.Fragment>
            <Grid padding="150px 20% 50px 20%">
            {
                post_list.map((p, idx)=> {
                    if(p.user_info.user_id === user_info?.uid){
                        return (
                            <Post key={p.id} {...p} idx={idx} is_me/>
                        )
                    }else{
                        return (
                            <Post key={p.id} {...p}/>
                        )
                    }
                })
            }
            </Grid>
        </React.Fragment>
    )
}

export default PostList;

