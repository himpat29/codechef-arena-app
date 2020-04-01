// import React, { useEffect, useContext,useState} from 'react';
// import AuthContext from '../../Context/auth/authContext';
// import CodechefContext from '../../Context/codechef/codechefContext';
// import { TablePagination } from 'react-pagination-table';
// import Spinner from '../layout/spinner';



// const Ranking = (props) => {
//     const authContext = useContext(AuthContext);
//     const codechefContext = useContext(CodechefContext);
//     const [Search,setSearch]=useState({
//         country:'',
//         institution:''
//     })

//     useEffect(() => {
//         authContext.loadPage();
//         codechefContext.getRankList(props.match.params.contestcode);
//         setSearch({
//             country:'',
//             institution:''
//         })
//         //eslint-disable-next-line
//     }, [])
    

//     const onChange=(e)=>{
//         setSearch({
//             ...Search,[e.target.name]:e.target.value
//         })
//     }

//     const onSubmit=(e)=>{
//      e.preventDefault();
//      codechefContext.getRankList(props.match.params.contestcode,Search.country,Search.institution);
     
//     }

//     if (codechefContext.loading) {
//         return (<div>
//             <div className='contestHeading'>
//                 <h1>
//                     {props.match.params.contestcode}
//                 </h1>       
//             </div>
//             <hr></hr>
//             <Spinner />
//         </div>)
//     }
//     const Header = ["Rank", "Username", "Total Time", "Penalty",
//         "Country", "Institution", "Total Score"]
//     return (
//         <div>
//             <div className='contestHeading'>
//                 <h1>
//                     {props.match.params.contestcode}
//                 </h1>
//             </div>
//             <hr></hr>
//             <h2 align="center">RankList</h2>
//             <div style={{width:"85%"}}className="card">
//             <div style={{width:"80%", backgroundColor:"#d1e2e5",textAlign:"center"}}className="card">
//             <form onSubmit={onSubmit} className="form">
//             <input type="text" placeholder="Country" name="country" value={Search.country} onChange={onChange}/>
//             <input type="text" placeholder="Institution" name="institution" value={Search.institution} onChange={onChange}/>
//             <button className="btn btn-dark btn-sm" type="submit">Submit</button>
//         </form>
//             </div>
//             {codechefContext.rankList.length!==0?  
//             <div style={{ overflowX: "auto" }}>
//                 <TablePagination
//                     className="rankList"
//                     headers={Header}
//                     data={codechefContext.rankList}
//                     columns="rank.username.totalTime.penalty.country.institution.totalScore"
//                     perPageItemCount={20}
//                     totalCount={codechefContext.rankList.length}
//                     arrayOption={[["size", 'all', ' ']]}
//                 />
//             </div>:<h2>Not found</h2>}
//             </div>
//         </div>
//     )
// }
// export default Ranking;