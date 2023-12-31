const e = require("express");
const { bookApa, bookMla, bookChicago, bookVancouver } = require("./book");
const { chapterApa, chapterMla, chapterChicago, chapterVancouver } = require("./chapter");
const { conferenceApa, conferenceMla, conferenceChicago, conferenceVancouver } = require("./conference");
const { journalApa, journalMla, journalChicago, journalVancouver } = require("./journal");

const capitalize=(str)=>{
    console.log(str)
    return str[0].toUpperCase()+str.slice(1);
}

const citePaper=(arr,type,cite)=>{
    var yearWise={}
    // console.log(arr)
    // console.log(type)
    // console.log(cite)
    for(let i=0;i<arr.length;i++){
        var newValue;
        // console.log(arr[i])
        if(type==='book'){
            if(cite==='apa')    newValue=(bookApa(arr[i]));
            if(cite==='mla')    newValue=(bookMla(arr[i]));
            if(cite==='chicago')    newValue=(bookChicago(arr[i]));
            if(cite==='vancouver')    newValue=(bookVancouver(arr[i]));
        }
        if(type==='chapter'){
            if(cite==='apa')    newValue=(chapterApa(arr[i]));
            if(cite==='mla')    newValue=(chapterMla(arr[i]));
            if(cite==='chicago')    newValue=(chapterChicago(arr[i]));
            if(cite==='vancouver')    newValue=(chapterVancouver(arr[i]));
        }
        if(type==='journal'){
            if(cite==='apa')    newValue=(journalApa(arr[i]));
            if(cite==='mla')    newValue=(journalMla(arr[i]));
            if(cite==='chicago')    newValue=(journalChicago(arr[i]));
            if(cite==='vancouver')    newValue=(journalVancouver(arr[i]));
        }
        if(type==='conference'){
            if(cite==='apa')    newValue=(conferenceApa(arr[i]));
            if(cite==='mla')    newValue=(conferenceMla(arr[i]));
            if(cite==='chicago')    newValue=(conferenceChicago(arr[i]));
            if(cite==='vancouver')    newValue=(conferenceVancouver(arr[i]));
        }
        if(newValue.success){
            const year=arr[i].publishedOn.slice(0,4)
            yearWise[year]=yearWise[year]||[]
            yearWise[year].push(newValue.value)
        }
        else return newValue;
    }
    return {success:1,value:yearWise};
}

const extractFields=(arr,fields)=>{
    try {
        let value=[];
        arr.forEach(paper=>{
            let temp={};
            fields.forEach(field=>{
                temp={...temp,[field]:paper[field]}
            })
            value.push(temp);
        })
        // console.log(value)
        return {success:1,value};
    } catch (error) {
        return {success:0};
    }
}
module.exports ={capitalize,citePaper,extractFields};