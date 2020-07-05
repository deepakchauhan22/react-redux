import React, { Component } from 'react';
import {Card, CardImg, CardText,CardBody,CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Breadcrumb,BreadcrumbItem} from 'reactstrap';
import { Modal,ModalHeader,ModalBody, Label,Button ,Col,Row} from 'reactstrap';
import {Control ,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<= len);
const minLength = (len) => (val) => val && (val.length >= len);

    
class CommentForm extends Component{


    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

    }

    
    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating ,
             values.author,  values.comment);
    }


    toggleModal()
    {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }


    render () {
        return(
           <div className = "container">
         
                <Button outline onClick={this.toggleModal}>
                      <span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                            
            
                 <Modal isOpen= {this.state.isModalOpen} toggle = {this.toggleModal}>
                 <ModalHeader toggle = {this.toggleModal}> Submit Comment</ModalHeader>
                 <ModalBody>
                  

                      <LocalForm onSubmit = {(values)=> this.handleSubmit(values)}>
                      
                            
                              <Row className="form-group">
                                    <Label for = "rating" md = {2}>Rating</Label>
                                    <Col md={10}>  

                                    <Control.select  defaultValue = "5" model = ".rating" id= ".rating" name = "rating" 
                                    className = "form-control"
                                    >
                                    <option>1</option>
                                     <option>2</option>
                                     <option>3</option>
                                     <option>4</option>
                                     <option>5</option>
                                     
                                        </Control.select>
                                         </Col> 
                                </Row>    
                              
                                 <Row className="form-group">
                                    <Label htmlfor = "author" md = {2}> Full Name </Label>
                                    <Col md = {10}>
                                     <Control.text model = ".author" id= "author" name = "author" 
                                     placeholder = "Author" 
                                     className="form-control"     
                                     validators =   {{
                                         required, minLength:minLength(3),maxLength: maxLength(15)
                                     }}                            
                                   />
                                   {<Errors 
                                      className="text-danger"
                                      model = ".author"
                                      show="touched"
                                      messages={{
                                          required:'Required',
                                          minLength : "Must be greater than 2 chrs",
                                          maxLength: "Must be 15 characters or less"
                                        }}
                                   /> }
                               
                                 </Col>
                                </Row>
                                <Row className="form-group">
                                 <Label htmlfor = "message" md = {2}> Comment</Label>
                                 <Col md = {10}>
                                     <Control.textarea model = ".comment" id= "comment" name = "comment" rows = "12" 
                                     className = "form-control"
                                     />
                                 </Col>
                                 </Row>
                                <Row className="form-group">
                                  <Col md = {{size:10,offset:2}}>
                                   <Button type="submit" color = "primary">
                                       Submit
                                   </Button>
                                   </Col>
                                </Row>

                                


                        </LocalForm>
                    

                   
            </ModalBody>
        </Modal>
        </div>
        );
    }
}



function RenderDish({dish}){

        
    
        if(dish!=null){
            return(
                <div className = "col-12 col-md-5 m-1"> 
               <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                 <CardImg width="100%" src = {baseUrl+dish.image} alt = {dish.name}/>
                  <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                  </CardBody>
                </Card>
                </FadeTransform>
                </div>
            )
        }
        else{
            return( <div></div>);
        }
    }

    function RenderComments({comments,postComment,dishId}){
        if(comments!=null){

            const cmnts = comments.map((comment)=>{
            return(
               <li key = {comment.id}> 
                  <p>{comment.comment}</p>
                  <p>{comment.author}, {new Intl.DateTimeFormat('en-us',{
                      year:'numeric',
                      month: 'long',
                      day:'2-digit'}).format(new Date(comment.date))
                  
                  }
                  
                  </p>
               </li>   
              )
            })
            return(
              
               
                <div className= "col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className='list-unstyled'>
                    <Stagger in>
                    <Fade in>
                    {cmnts}
                    </Fade>
                    </Stagger>
                </ul>
                <CommentForm dishId = {dishId} postComment = {postComment} />
                </div>
                
             
              
            )
          }
            else{
            return( <div></div>);
        }

    }


    const DishDetail = (props) =>
    { 
        if(props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }

        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
       
        //  const dishItem = this.renderDish(dish)
        //  const commentItem= this.renderComments(dish.comments)
        else if(props.dish != null)

          return(
                <div className="container">
                  <div className = "row">
                   <Breadcrumb>
                    
                   <BreadcrumbItem><Link to = {`/menu`} > Menu </Link>   
                   </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    <div className = "col-12">
                     <h3>
                     {props.dish.name}
                     </h3>
                   </div>
                     </Breadcrumb>
                    </div>
               
                  <div className = "row">
                  <RenderDish dish = {props.dish}/>
                  <RenderComments comments = {props.comments}
                   postComment={props.postComment}
                   dishId = {props.dish.id}
                  />     
                 
                  </div>
                </div>
               
         );
         else
             return (<div></div>)
         
        
    }

export default DishDetail;