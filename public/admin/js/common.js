//  实现将表单得到的数组转为对象
function serializeObject(forms){
    var result={}
    var form=forms.serializeArray()
    form.forEach(item=>{
        result[item.name]=item.value
    })
    return result;
}