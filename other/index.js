// 实现 Memorize函数 memorize(a,b) 多次调用参数不变不会执行toString 执行返回缓存
// function memorize(a,b){
//     // 你的代码
//     return a.toString()+b.toString();
// }
memorize(1,2);


function memorize(a,b){
    // if(!this.memorizeKyes){
    //     this.memorizeKyes=new Map();
    // }
    // const memorizeKyes=this.memorizeKyes;
    if(!memorize['memorizeKyes']){
        memorize['memorizeKyes']=new Map();
    }
    const memorizeKyes=memorize['memorizeKyes'];
    console.log(memorizeKyes);
    const key=a+b;
    if(memorizeKyes.has(key)){
        return memorizeKyes.get(key);  
    }
    const result=a.toString()+b.toString();
    memorizeKyes.set(key,result);
    return result;
}

memorize(1,2);
memorize(1,2);
memorize(1,2);
memorize(1,2);
memorize(1,3);
memorize(1,5);
memorize(1,5);
memorize(1,{});
memorize(1,{});


console.log(memorize);