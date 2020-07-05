import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';



export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

            return fetch(baseUrl + 'dishes')
            .then(response => {
                if (response.ok) {
                return response;
                } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
                }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) =>({
    type:ActionTypes.ADD_DISHES,
    payload: dishes
});


//------------------------------------------------------------------------------------------------

export const fetchComments = () => (dispatch) =>{
      
    return fetch(baseUrl+'comments')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error'+response.status+':'+ response.statusText)
                    error.response = response;
                    throw error;
                }

            },
            error =>{
                var errmess = new Error(error.message);
                throw errmess;
            }
            )
         .then(response=> response.json()) //converting the response to json
         .then(comments => dispatch(addComments(comments))) //callback function
         .catch(error => dispatch(commentsFailed(error.message)));
}


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) =>({
    type:ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId,rating,author,comment) =>(dispatch)=>{
 const newComment = {
     dishId : dishId,
     rating: rating,
     author: author,
     comment: comment
 } //since its a thunk we pass(dispatch) i.e function of a funtion
  newComment.date = new Date().toISOString();

  return fetch(baseUrl+ 'comments',{
      method: 'POST',
      body: JSON.stringify(newComment),
      headers:{
          'Content-type':'application/json'
      },
      credentials: 'same-origin'
  })

        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json()) //will contain the update comment
        .then(response => dispatch(addComment(response)))
        .catch(error => {console.error('Post comments',error.message);
               alert('Comment could not be posted\nError:'+error.message)
                 })
};

//-------------------------------------------------------------------------------------------------------------------

export const fetchPromos = () => (dispatch) =>{
    dispatch(promosLoading(true));

    return fetch(baseUrl+'promotions')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error'+response.status+':'+ response.statusText)
                    error.response = response;
                    throw error;
                }

            },
            error =>{
                var errmess = new Error(error.message);
                throw errmess;
            }
            )
         .then(response=> response.json()) //converting the response to json
         .then(promos => dispatch(addPromos(promos))) //callback function
         //once the dishes are obtained then it will push the dishes in redux store by dispatching
         .catch(error => dispatch(promosFailed(error.message)));
    // setTimeout(()=>{
    //     dishpatch(addDishes(DISHES))
    // },2000);
}

export const promosLoading = () => ({
type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) =>({
    type:ActionTypes.ADD_PROMOS,
    payload: promos
});

//--------{Leaders}-------------------------------------------------------------------------------------------

export const fetchLeaders = () => (dispatch) =>{
    dispatch(leadersLoading(true));

    return fetch(baseUrl+'leaders')
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else{
                    var error = new Error('Error'+response.status+':'+ response.statusText)
                    error.response = response;
                    throw error;
                }

            },
            error =>{
                var errmess = new Error(error.message);
                throw errmess;
            }
            )
         .then(response=> response.json()) //converting the response to json
         .then(leaders => dispatch(addLeaders(leaders))) //callback function
         //once the dishes are obtained then it will push the dishes in redux store by dispatching
         .catch(error => dispatch(leadersFailed(error.message)));
    // setTimeout(()=>{
    //     dishpatch(addDishes(DISHES))
    // },2000);
}

export const leadersLoading = () => ({
type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) =>({
    type:ActionTypes.ADD_LEADERS,
    payload: leaders
});

//----------{Feedback}------------------
export const addFeedback = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postFeedback = ( firstname,lastname,telnum, email, agree, contactType, message) =>(dispatch)=>{
 const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    telnum: telnum,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
 } //since its a thunk we pass(dispatch) i.e function of a funtion

  return fetch(baseUrl+ 'feedback',{
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers:{
          'Content-type':'application/json'
      },
      credentials: 'same-origin'
  })

        .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json()) //will contain the updated feedback
        .then(response => alert("Feedback submitted"+ JSON.stringify(response)))
        .catch(error => {console.error('Post Feedback',error.message);
               alert('Feedback could not be posted\nError:'+error.message)
                 })
};