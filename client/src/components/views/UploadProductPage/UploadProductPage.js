import React, {useState} from 'react';
import {Input, Select, Button} from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
const { TextArea }= Input;
const { Option } = Select;


const Continents= [
    {key:1, value:'Africa'},
    {key:2, value:'Europe'},
    {key:3, value:'Asia'},
    {key:4, value:'North America'},
    {key:5, value:'South America'},
    {key:6, value:'Australia'},
    {key:7, value:'Antarctica'}
];

function UploadProductPage(props){
    //부모컴포넌트안에는 서버쪽으로 보낼모든정보들을 반드시 다 가지고 있어야하나?
    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Continent, setContinent] = useState('');
    const [Images, setImages]= useState([]);

    const titleChangeHandler= (e)=> {
        setTitle(e.target.value)
    }
    const descriptionChangeHandler= (e)=> {
        setDescription(e.target.value)
    }
    const priceChangeHandler= (e)=> {
        setPrice(e.target.value)
    }
    const continentsChangeHandler= (e)=> {
        setContinent(e.target.value)
    }
    const updateImages= (newImages)=> {
        setImages(newImages)
    }
    const submitHandler= (e)=> {
        e.preventDefault();
        if(!Title || !Description || !Price || !Continent || !Images){
            return alert('모든 값을 넣어주셔야 합니다')
        }

        //서버로 채운값들을 request로 보낸다
        const body={
            writer: props.user.userData._id, //로그인된 사람의 id
            title: Title, 
            description: Description,
            price: Price,
            continents: Continents
        }
        axios.post('api/product', body)
            .then(response=> {
                if(response.data.success){
                    alert('상품업로드에 성공했습니다')
                    props.history.push('/')
                }else{
                    alert('상품업로드에 실패했습니다')
                }
            })
    }

    return(
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2>여행 상품 업로드</h2>
            </div>
            <form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages}/>   
                {/* 자식컴포넌트의 state값으로 부모의 state값을 변경하는 함수를 props로 보낸다
                이 방법 말고는 없나??*/}
                
                <br/> 
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/><br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/><br/>
                <label>가격</label>
                <Input onChange={priceChangeHandler} value={Price}/>
                <br/><br/>
                <Select onChange={continentsChangeHandler} >
                    {Continents.map(item=> (
                        <Option key={item.key} value={Continent}>{item.value}</Option>
                    ))}
                </Select>
                <br/><br/>
                <Button>확인</Button>
            </form>
        </div>
    );
}
export default UploadProductPage;