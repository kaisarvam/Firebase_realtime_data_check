
const list = document.querySelector('ul');
const form = document.querySelector('form');
const btn = document.querySelector('.btn-danger');


//adding to html output
const addRecipe =(recipe,id)=>{
    let author =recipe.author;
    let time = recipe.created_at.toDate();
  
  
  
    let html =`<li data-id="${id}"> 
    <div> ${author} </div>
    <div> ${recipe.title} </div>
    <div> ${time} </div>
    <button class="btn btn-danger btn-sm my-2">Delete</button>
    
    
    </li>` ;
  

    list.innerHTML += `${html}`;
    
    
}


// //get collections (one time data load)
// db.collection('recipes').get()
// .then((data)=>{

// data.docs.forEach(e => {

//    addRecipe(e.data(),e.id);
//                        });
// })
// .catch((err)=>{
//   console.log(err);
// })


// get collection data real time

db.collection('recipes').onSnapshot(e=>
  {
    
   e.docChanges()
   .forEach(change=>
    {
  const doc = change.doc;
  
    if(change.type==='added')
    {
      addRecipe(doc.data(),doc.id);
    }
  else if(change.type==='removed')
     {
       deleteRecipe(doc.id);
     }
   })
});

//delete recipe new

const deleteRecipe =(id)=>{

  const recipes = document.querySelectorAll('li');
  recipes.forEach(e=>{
    if(e.getAttribute('data-id')===id){
      e.remove();
    }
  });

}

//set collection

form.addEventListener('submit',e=>{

e.preventDefault();

const now = new Date();

const recipe = {
author: form.recipe.value,
title: form.title.value,
created_at: firebase.firestore.Timestamp.fromDate(now)
};




db.collection('recipes').add(recipe)
.then((e)=>{
  console.log('recipe added');

}).catch(err=>{
  console.log(err);
})

form.reset();


})


//delete data

list.addEventListener('click',e=>{
  console.log('clicked on',e.target.tagName);
  if(e.target.tagName==="BUTTON")
  {
    id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    db.collection('recipes').doc(id).delete()
    .then(e=>{
    }).catch(err=>{
      console.log(err);
    })
    
  }
  
})