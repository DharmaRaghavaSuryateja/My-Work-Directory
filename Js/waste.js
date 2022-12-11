// var s="hello"
// a=s.split("")
// console.log(a);

s="hpdjjjghh";
var a=s.split("");
c={}
for(var i=0;i<a.length;i++)
{
    if(c[a[i]])
    {
        c[a[i]]++
    }
    else
    {
        c[a[i]]=1;
    }

}
console.log(c)


// var a=[1,2,[3,4,[5,6],7]]

// printarray(a);

// function printarray(a)
// {
//     for(var i=0;i<a.length;i++)
//     {
//     if(typeof(a[i])==="object")
//     {
//         printarray(a[i]);
//     }
//     else{
//         console.log(a[i]);
//     }
// }
// }

// str = "hheelloohpr";
// const a=str.split("");
// const p=a.filter((item,index)=>
// {
//    return a.indexOf(item)==index;
// })

// for(let x of p)
// {
//    var count=0;
//     for(var i=0;i<a.length;i++)
//     {
//         if(a[i]==x)
//         {
//             count++;
//         }
//     }
//     console.log(x,count)
// }
// console.log(p)

// a=[1,1,2,3,4,5,4,5,6]
// var n=3;
// for(var j=0;j<n;j++)
// {
//     let x=a[0];
//     for(i=0;i<a.length;i++)
//     {
//         a[i]=a[i+1];
//     }
//     a[a.length-1]=x;
// }
// console.log(a)

// prime(5,100)
// function prime(a,b)
// {
//     for(var i=a;i<=b;i++)
//     {
//         if(isPrime(i))
//         {
//             console.log(i);
//         }
//     }
// }
// function isPrime(n)
// {
//     for(var x=2;x<n;x++)
//     {
//         if(n%x==0)
//         {
//             var flag=false;
//             break;
//         }
//     }
//     if(flag==false)
//     {
//         return false;
//     }
//     return true;
// }

// var s="appa";
// var a=[]
// for(var i=0;i<s.length;i++)
// {
//   a.push(s[i]);
// }
// s1=a.join("")
// console.log(s1)

// function fib(a,b,n)
// {  let n1 = a,
//   n2 = b,
//   n3;
//     for(var i=0;i<n;i++)
//     {  n3=n1+n2;
//         console.log(n3)
//         n1=n2
//         n2=n3
//     }
// }
// fib(0,1,5)

// var s="hello"
// var s1="olehl"
// var la=[],ra=[];
// for(var i=0;i<s.length;i++)
// {
//   la.push(s[i]);
//   ra.push(s1[i])
// }
// la.sort();
// ra.sort();
// s=la.join("")
// s1=ra.join("")
// console.log(s,s1)

// let userObj = {
//   name: "Sammy",
//   email: "sammy@example.com",
//   plan: "Pro",
// };

// let userStr = JSON.stringify(userObj);

// console.log(userStr);

// a = [1, 3, 2, 4, 7, 8, 6, 9];
// n=a.length;
// for(var i=1;i<n;i++)
// {
//     key=a[i];
//     j=i-1;
//     while(j>=0 && a[j]>key)
//     {
//         a[j+1]=a[j];
//         j--;
//     }
//     a[j+1]=key;
// }
// console.log(a)

// for(var i=0;i<n-1;i++)
// {
// min=i;
// for(j=i+1;j<n;j++)
// {
//     if(a[j]<a[min])
//     {
//         min=j
//     }
// }
// temp=a[i];
// a[i]=a[min];
// a[min]=temp;
// }
// console.log(a)

// a = [1, 3, 2, 4, 7, 8, 6, 9];
// n=a.length;
// mergesort(a,0,a.length-1)

// function mergesort(a,l,h)
// {
//     if(l<h)
//     {
//     var mid=Math.floor((h+1)/2)
//     var la=[],ra=[];
//     for(var i=0;i<a.length;i++)
//     {
//         if(i<mid)
//         {
//             la.push(a[i])
//         }
//         else{
//             ra.push(a[i])
//         }
//     }
//     mergesort(la,0,la.length-1)
//     mergesort(ra,0,ra.length-1)
//     merge(a,la,ra)
// }
// }
// function merge(a,la,ra)
// {
//     var l=0,r=0,i=0;
//     while(l<la.length && r<ra.length)
//     {
//         if(la[l]<ra[r])
//         {
//             a[i++]=la[l++];
//         }
//         else{
//             a[i++]=ra[r++];
//         }
//     }
//     while(l<la.length)
//     {
//         a[i++]=la[l++];
//     }
//     while(r<ra.length)
//     {
//         a[i++]=ra[r++];
//     }
// }
// console.log(a)

// var a=[1,3,2,4,7,8,6,9]
// var n=a.length;
// quicksort(a,0,n-1);
// function quicksort(a,l,h)
// {
//    if(l<h)
//    {
//       var x=sort(a,l,h);
//       quicksort(a,l,x-1)
//       quicksort(a,x+1,h);
//    }
// }
// function sort(a,l,h)
// {

//     var i=l,j=h,p=l;
//     var temp;
//     while(i<=j)
//     {
//         while(a[i]<=a[p] && i<=h)
//         {
//             i++;
//         }
//         while (a[j]>a[p] && j>=l) {
//           j--;
//         }
//         if(i<=j)
//         {
//             temp=a[i];
//             a[i]=a[j];
//             a[j]=temp;
//         }
//     }
//     temp=a[j]
//     a[j]=a[p]
//     a[p]=temp;
//    return j;
// }

// console.log(a)

// x(10).then((n)=>
// {
//   console.log(n);
//   return x(n)
// }).then((n)=>
// {
//   console.log(n);
//   return x(n)
// }).then((n)=>
// {
//   console.log(n);
// })

// a=[9,3,2,4,5,7,1,8]
// mergesort(a,0,a.length-1)
// function mergesort(a,l,h)
// {

//     if(l<h)
//     {
//     var mid=Math.floor((h+1)/2);
//     var la=[],ra=[];
//     for(var i=0;i<a.length;i++)
//     {
//         if(i<mid)

//         {
//             la.push(a[i])
//         }
//         else{
//             ra.push(a[i])
//         }
//     }
//     mergesort(la,0,la.length-1)
//     mergesort(ra,0,ra.length-1)
//     merge(la,ra,a);

//     }

// }
// function merge(la,ra,a)
// {
//     let i=0,r=0,l=0;
//     while(l<la.length && r<ra.length)
//     {
//        if(la[l]<ra[r])
//        {
//         a[i++]=la[l++];
//        }
//        else{
//         a[i++]=ra[r++];
//        }
//     }
//     while(l<la.length)
//     {
//         a[i++]=la[l++];
//     }
//     while(r<ra.length)
//     {
//         a[i++]=ra[r++];
//     }
// }
// console.log(a)

// function process(val, sec, rej = false) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!rej) {
//         resolve(val);
//       } else {
//         reject("Error");
//       }
//     }, sec);
//   });
// }

// async function process_one() {
//   return process(10, 500);
// }

// async function process_two() {
//   return process(40, 100);
// }

// async function process_three() {
//   return process(50, 1000);
// }

// async function process_four() {
//   return process(20, 800);
// }

// async function run_processes() {
//   let res = null;
//   try {
//     res = await Promise.all([
//       process_one(),
//       process_two(),
//       process_three(),
//       process_four(),
//     ]);
//     console.log("Success >>", res);
//   } catch (err) {
//     console.log("Fail >>", res, err);
//   }
// }

// run_processes();

// function x(name,age)
// {
//     this.name=name;
//     this.age=age;
// }
// let a1= new x("surya",10);
// array=[]
// array.push(a1);
// console.log(array);

// for(var i=1;i<=10;i++)
// {
//     setTimeout(function(i){
//         console.log(i)
//     }.bind(this,i),1000*i)
// }

// a=[1,3,4,2,3,5,4,6,7,2,6,9,7,8]
// p={}
// a.forEach((item,index)=>
// {
//   p[index]=item;
// })
// console.log(p)
// q={}
// for(let i in p)
// {
//     s=p[i];
//     q[s]=p[i];
// }
// console.log(q)

// a=["surya","ravi"]
// function join(stud,callback)
// {
//    setTimeout(()=>
//    {
//      a.push(stud);
//      callback();
//    },2000)
// }
// function fetch()
// {
//     console.log(a);
// }
// join("kk",fetch)

// a=[3,2,6,8,2,4,1];
// let r=a.reduce((acc,curr)=>
// {
//    if(curr>acc)
//    {
//     acc=curr
//    }
//    return acc;
// },0)
// console.log(r)

// function x(n)
// {
//    return new Promise((resolve,reject)=>
//    {
//      setTimeout(() => {
//        resolve(n*2);
//      }, 1000);
//    })

// }

// async function p()
// {
//    const a1= await x(10);

//    console.log(a1)

//    const a2= await x(a1);
//    console.log(a2);

//    return a2;

// }

// p().then((n)=>
// {
//    console.log(n);
// })
