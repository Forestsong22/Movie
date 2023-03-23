require('dotenv').config();
const MOVIE_API = process.env.TMDB_API;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
const KOFIC_API = process.env.KOFIC_API;
const PUBLIC_SERVICEKEY = process.env.PUBLIC_SERVICEKEY;

const { Movie } = require('../models/movie');
const { Today } = require('../models/today');




// today 10개 저장
const todayMovie = async () => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key='+MOVIE_API+'&language=ko-KR'

    let response = await fetch(url)
    let data = await response.json()
    
    let moviedata = data['results'].slice(0,10)
    return moviedata  
    // for(let i = 0; i < moviedata.length; i++){
    // const dataset = new Today({
    // adult: moviedata[i].adult,
    // backdrop_path: moviedata[i].backdrop_path,
    // id: moviedata[i].id,
    // title: moviedata[i].title,
    // original_language: moviedata[i].original_language,
    // original_title: moviedata[i].original_title,
    // overview: moviedata[i].overview,
    // poster_path: moviedata[i].poster_path,
    // media_type: moviedata[i].media_type,
    // genre_ids: moviedata[i].genre_ids,
    // popularity: moviedata[i].popularity,
    // release_date: moviedata[i].release_date,
    // video: moviedata[i].video,
    // vote_average: moviedata[i].vote_average,
    // vote_count: moviedata[i].vote_count,  
    // });
    // dataset.save().then(res=>console.log(res)).catch(err=>console.log(err))
};

const todaySelect = async (number) => {
    const url = 'https://api.themoviedb.org/3/trending/movie/day?api_key='+MOVIE_API+'&language=ko-KR'

    let response = await fetch(url)
    let data = await response.json()
    let getdata = data['results'][`${number}`]
    return getdata
};





const nowMovie = async () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+MOVIE_API+'&language=ko-KR&page=1'

    let response = await fetch(url)
    let data = await response.json()    
}


async function koficDaily(){
    const url = 'http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=' + KOFIC_API +'&targetDt=20230322'

    let response = await fetch(url)
    let data = await response.json()
    let moviedata = data['boxOfficeResult']['dailyBoxOfficeList']

    let movieinfo = []

    for(let i = 0; i < moviedata.length; i++){
        movieinfo.push(moviedata[i]['rank'], moviedata[i]['movieNm'], moviedata[i]['openDt'])
    } 
    console.log(movieinfo)
}



// 대전 모범음식점 조회
async function getRestrnt(){
    const url= 'https://apis.data.go.kr/6300000/openapi2022/restrnt/getrestrnt?serviceKey=' + PUBLIC_SERVICEKEY + '&pageNo=1&numOfRows=10'

    let response = await fetch(url)
    let data = await response.json()
    let datas = data['response']['body']['items']

    let result = []
    for(let i = 0; i < datas.length; i++){
        let restrntNminfo = datas[i]
        result.push(restrntNminfo)
    }
    return result
};


//tmdb 이미지 가져오기
async function getNow(){
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+MOVIE_API+'&language=ko-KR'

    let response = await fetch(url)
    let data = await response.json()
    
    let moviedata = data['results'].slice(0,10)

    let result = []
    for(let i = 0; i < moviedata.length; i++){
        let movieinfo = moviedata[i]
        let image = moviedata[i]['poster_path']
        result.push(movieinfo,{image: IMAGE_BASE_URL + image})        
    }
    return result
};

async function getNowSelect(number){
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+MOVIE_API+'&language=ko-KR'

    let response = await fetch(url)
    let data = await response.json()
    let getdata = data['results'][`${number}`]
    return getdata
};
/*==============================================================================================================*/


module.exports = {todayMovie, todaySelect, getNow, getNowSelect}