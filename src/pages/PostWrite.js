import React, {useRef} from "react";
import {Grid, Text, Button, Image, Input} from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch} from "react-redux";
import {actionCreators as postActions} from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props)=> {
    const dispatch = useDispatch();
    const is_login = useSelector((state)=> state.user.is_login);
    const preview = useSelector((state)=> state.image.preview);
    const post_list = useSelector((state)=> state.post.list);
    const {history} = props;

    const post_id = props.match.params.id;
    const is_edit = post_id ? true: false;

    let _post = is_edit ? post_list.find((p) => p.id === post_id) : null
    
    const [contents, setContents] = React.useState(_post? _post.contents : "");
    const [layout, setLayout] = React.useState("");

    React.useEffect(()=> {
        if(is_edit && !_post){
            console.log('포스트 정보가 없어요!');
            history.goBack();

            return;
        }

        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    const changeContents = (e)=> {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents, layout: layout}));
    }

    if(!is_login){
        return (
            <Grid margin="100px 0px" center padding="150px 20% 50px 20%">
                <Text size="32px" bold>앗! 잠깐!</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button _onClick={()=> {history.replace("/");}}>로그인 하러 가기</Button>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            <Grid padding="150px 20% 50px 20%">
                <Grid>
                    <Text margin="0 0 20px 0" size="36px" bold color="rgb(168,105,208)">{is_edit ? "게시글 수정" : "게시글 작성"}</Text>
                    <Upload preview={preview}></Upload>
                </Grid>
                <Grid>
                    <Grid>
                        <Text margin="0 0 20px 0" size="24px" bold color="rgb(168,105,208)">미리보기</Text>
                    </Grid>
                    <Grid padding="20px 35px">
                        <Input is_radio label="오른쪽에 이미지 왼쪽에 텍스트" _onClick={()=> setLayout("img_right")} defaultChecked="checked"></Input>
                        <Grid is_flex margin="20px 0 0 0">
                            <Text width="100%" margin="0 25px 0 0" size="20px" bold>{contents ? contents : "텍스트"}</Text>
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}></Image>
                        </Grid>
                    </Grid>
                    <Grid padding="20px 35px">
                        <Input is_radio label="왼쪽에 이미지 오른쪽에 텍스트" _onClick={()=> setLayout("img_left")}></Input>
                        <Grid is_flex margin="20px 0 0 0">
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}></Image>
                            <Text width="100%" margin="0 0 0 25px" size="20px" bold>{contents ? contents : "텍스트"}</Text>
                        </Grid>
                    </Grid>
                    <Grid padding="20px 35px">
                        <Input is_radio label="하단에 이미지 상단에 텍스트" _onClick={()=> setLayout("img_auto")}></Input>
                        <Grid margin="20px 0 0 0">
                            <Text margin="0 0 20px 0" size="20px" bold>{contents ? contents : "텍스트"}</Text>
                            <Image shape="rectangle" src={preview ? preview : "http://via.placeholder.com/400x300"}></Image>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid padding="16px" margin="20px 0 20px 0">
                    <Input value={contents} _onChange={changeContents} label="게시글 내용" placeholder="게시글 작성" multiLine></Input>
                </Grid>
                <Grid padding="16px">
                    {is_edit ? (
                        <Button text="게시글 수정" _onClick={editPost}></Button>
                    ) : (
                        <Button text="게시글 작성" _onClick={addPost} disabled={contents === "" ? true : false}></Button>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default PostWrite;