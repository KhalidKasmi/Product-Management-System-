let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')

let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let mode = 'create'
let temp
let aux



//GET Total
function gettotal(){
    if(price.value!=''){
        let result = (+price.value + +taxes.value+ +ads.value ) - +discount.value
        total.innerHTML=result
        total.style.background= '#040'
    } else{
        total.innerHTML=''
        total.style.background= '#b70404'

    }
}

// create product

let datapro 
if(localStorage.product !=null){
    
    datapro= JSON.parse(localStorage.product)
   
}else{
    datapro = []
}



submit.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count

    //clean data//
    if(title.value !='' && price.value !='' && category.value!=''&& newpro.count < 101 ){
        if(mode === 'create'){
        
            if (newpro.count > 1){
                for( let i = 0 ; i < newpro.count; i++){
        
                    datapro.push(newpro)
                }
               
            }else{
                datapro.push(newpro)
            }
        
        }else{
            datapro[temp]= newpro
            mode = 'create'
            submit.innerHTML= 'create'
            count.style.display='block'
        }
       
        // save localstorage
        
        localStorage.setItem('product', JSON.stringify(datapro))

        cleardata()

    }
   
    
    
   
    showdata()
   
  
}


// clear inputs
function cleardata(){
    title.value=''
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    total.innerHTML=''
    count.value=''
    category.value=''


}
//read
function showdata(){
   //we use function gettotal here to make it red after creation 
    gettotal()
    let table=''

    for( let i=0 ; i< datapro.length ; i++){
        table +=` <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick = 'Modifier(${i})' id='update'>update</button></td>
        <td><button onclick='effacer(${i})' id='delete'>delete</button></td>

    </tr>`
        
         }
    document.getElementById('tbody').innerHTML=table

   let BtndeleteAll = document.getElementById('deleteAll')
   
    if(datapro.length > 0 ){
        BtndeleteAll.innerHTML = `
        <button onclick = 'effacertt()'>Delete All (${datapro.length}) </button>
        `
       }else{
        BtndeleteAll.innerHTML=''
       }
  
  
   

        }
  showdata()



//count
//delete

function effacer(i){
    datapro.splice(i,1)
    localStorage.product = JSON.stringify(datapro)
    showdata()
}

function effacertt(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}


//update
function Modifier(i){
title.value = datapro[i].title
price.value = datapro[i].price
taxes.value = datapro[i].taxes
ads.value = datapro[i].ads
discount.value = datapro[i].discount
taxes.value = datapro[i].taxes
category.value = datapro[i].category
gettotal()
submit.innerHTML = 'update'
count.style.display = 'none'
mode = 'update'
temp = i
scroll({
    top:0,
    behavior:'smooth'
})

}



//search


let searchMode = 'title'

function getsearchMode(id){
    let search = document.getElementById('search')
   if(id == 'searchtitle'){
    searchMode = 'title'
    

   }else{
    searchMode = 'category'
    
   }
   search.placeholder = 'search by ' +searchMode
   searchShow = 'yes'
   search.focus()
   search.value=''
   showdata()

}
function searchdata(value){
    let table =''
    let counter = 0
if(searchMode == 'title'){
    for(let i = 0; i<datapro.length;i++){
        if(datapro[i].title.includes(value.toLowerCase())){
           
            counter++
            table +=` <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = 'Modifier(${i})' id='update'>update</button></td>
            <td><button onclick='effacer(${i})' id='delete'>delete</button></td>
    
        </tr>`

        }
    }

}else{
    for(let i = 0; i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            
            counter++
            table +=` <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = 'Modifier(${i})' id='update'>update</button></td>
            <td><button onclick='effacer(${i})' id='delete'>delete</button></td>
    
        </tr>`


}

}}

document.getElementById('tbody').innerHTML=table
aux = counter
console.log(aux)

}
