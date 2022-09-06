// select items
const form= document.querySelector('.to-do-form')
 const alert= document.querySelector('.alert')
 const item= document.querySelector('#to-do-value')
 const submitBtn= document.querySelector('.submit-btn')
 const deleteBtn= document.querySelector('.delete-btn')
 const editBtn= document.querySelector('.edit-btn')
  const container= document.querySelector('.to-do-list-container')

 let editFlag = false;
 let editElementID ='';
 let editElement;

 form.addEventListener('submit',addItem)
 window.addEventListener('DOMContentLoaded', loadcontent)


 function addItem(e){
  e.preventDefault()
  let formValue= item.value
  const id= new Date().getTime().toString()
  if(formValue&& !editFlag){
    CreatelistItem(formValue, id);
    // add class
    container.classList.add("show-container");
    // display alert
    displayAlert("item has been added", "success");
    // set back to default
    setToDefault();
    // add to local storage
    addToLocalStorage (id, formValue);
  }
  else if(formValue && editFlag){
    editElement.innerHTML= formValue
    displayAlert('your value has been updated', 'succes')
    editLocalStorage(formValue, editElementID)
    setToDefault()
  }

  else{
   displayAlert('please enter a value','danger');
  }


 }

// cleate list items
 function CreatelistItem(value, id){
  const element= document.createElement('article')
  const dataId= document.createAttribute('data-id')
  dataId.value=id
  element.setAttributeNode(dataId)
  element.classList.add('to-do-item')
  element.innerHTML = `    <p>${value}</p>
    <div class="btn-container">
     <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
     <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>`;

      const deleteBtn = element.querySelector(".delete-btn");
      const editBtn = element.querySelector(".edit-btn");
       deleteBtn.addEventListener("click", deleteitem);

       editBtn.addEventListener('click', editItem)
      container.appendChild(element);
      
 }
 // set back to default
 function setToDefault(){
  item.value=''
  editFlag = false;
  editElementID = "";
  submitBtn.textContent='submit'
 }
 // display alert

 function displayAlert(text,operation){
  alert.textContent= text
  alert.classList.add(`alert-${operation}`)

  setTimeout(function(){
   alert.textContent = '';
   alert.classList.remove(`alert-${operation}`);

  },1000)
  
 }
 // delete item
 function deleteitem(e){
  const target= e.currentTarget.parentElement.parentElement
  id= target.dataset.id
  container.removeChild(target)
  displayAlert('item had been deleted from list','danger')
  if(container.children.length===0){
   container.classList.remove('show-container')
  }
  setToDefault()

  removeFromLocalStorage(id)

 }

 
 // edit item
 function editItem(e){
  const element= e.currentTarget.parentElement.parentElement
  editElement= e.currentTarget.parentElement.previousElementSibling
  item.value= editElement.innerHTML
  submitBtn.textContent='edit'
  editFlag= true
  editElementID=element.dataset.id
 }


 function addToLocalStorage(id, value) {
   const listItem = { id: id, value: value };

   let itemsInList = getLocalStorage();
   itemsInList.push(listItem);
   localStorage.setItem("lists", JSON.stringify(itemsInList));
 }

 function removeFromLocalStorage(Id) {
   let itemsInList= getLocalStorage()
   itemsInList = itemsInList.filter(function (singleItem){
     if (singleItem.id !==Id) {
       console.log(singleItem);
       return singleItem;

     }
    console.log(singleItem.id);
   });
   localStorage.setItem("lists", JSON.stringify(itemsInList));
 }

 function editLocalStorage(value,id){
  let itemsInList= getLocalStorage()
  itemsInList=itemsInList.map(function(singleItem){
    if(singleItem.id==id){
      singleItem.value=value
    }
    return singleItem
  })
  localStorage.setItem('lists',JSON.stringify(itemsInList))
 }

 function loadcontent(){
  let itemsInList= getLocalStorage()
  if (itemsInList.length>0) {
    itemsInList=itemsInList.forEach(function(singleItem){
      CreatelistItem(singleItem.value, singleItem.id)
    })
    container.classList.add("show-container");
  }
 }

 function getLocalStorage(){
  return localStorage.getItem("lists")
  ? JSON.parse(localStorage.getItem('lists')):[];
 }