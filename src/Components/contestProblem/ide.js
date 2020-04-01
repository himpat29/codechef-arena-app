// import React, { useState, useContext } from 'react';
// // import MonacoEditor from '@uiw/react-monacoeditor';
// import CodechefContext from '../../Context/codechef/codechefContext';
// import AlertContext from '../../Context/alert/alertContext';
// import Alert from '../layout/alert';
// import Spinner from '../layout/spinner.js';


// const Ide = (props) => {
//     const codechefContext = useContext(CodechefContext);
//     const alertContext = useContext(AlertContext);
//     const [code, setCode] = useState('// Type your code here');
//     const [status, setStatus] = useState(null);
//     const [output, showOutput] = useState(null);
//     const [input, setInput] = useState({
//         SelLanguage: 'Select any language',
//         testInput: ''
//     })
//     const onChangeEditor = (newValue, e) => {
//         setCode(newValue)
//     }
//     const onChange = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });

//     }
//     const onClick = async (e) => {
//         e.preventDefault();
//         if (input.SelLanguage === 'Select any language') {
//             alertContext.setAlert('Please select language', 'danger');
//         }
//         else {
//             showOutput(null);
//             setStatus('Submitting your code');
//             await codechefContext.runCode(input.SelLanguage, code, input.testInput);
//             setStatus(null);
//             showOutput(true);
//         }
//     }
//     const onSubmit = async (e) => {
//         e.preventDefault();
//         if (input.SelLanguage === 'Select any language') {
//             alertContext.setAlert('Please select language', 'danger');
//         }
//         else {
//             showOutput(null);
//             setStatus('Running your code');
//             await codechefContext.runCode(input.SelLanguage, code, input.testInput);
//             setStatus(null);
//             showOutput(true);

//         }
//     }
//     return (

//         <div>
//             <div>
//                 <select className="language" name="SelLanguage" onChange={onChange} value={input.SelLanguage}>
//                     <option>Select any language</option>
//                     {
//                         props.language.map(lang => <option key={lang} value={lang}>{lang}</option>)
//                     }
//                 </select>
//             </div>
//             <div style={{ overflowX: "auto" }}>
//                 <MonacoEditor
//                     width="100%"
//                     height="800px"
//                     language={input.SelLanguage.toLowerCase()}
//                     value={code}
//                     options={{
//                         theme: 'vs-dark',
//                         fontSize: '20px'
//                     }}
//                     onChange={onChangeEditor}
//                 />
//             </div>
//             <div>
//                 <Alert />
//                 {status ? <div className={`alert alert-success`}>
//                     <i className='fas fa-info-circle' /> {status}  </div> : <div></div>}
//                 {output ? <div><h2>Output</h2>{codechefContext.codeStatus?
//                 <textarea readOnly style={{ overflowX: "auto", width: "100%", height: "200px",backgroundColor:"aliceBlue" }} rows="1000" cols="50" value={codechefContext.codeStatus}/>
//                  :<Spinner/>}
//                  </div>: <div></div>}
//                 <form className="ide" onSubmit={onSubmit}>
//                     <h3 style={{ marginTop: "2%" }}>Type your input below </h3>
//                     <textarea name="testInput" onChange={onChange} style={{ overflowX: "auto", width: "100%", height: "200px" }} rows="1000" cols="50" />
//                     <button type='submit' className="btn btn-sm btn-dark">Run</button>

//                     <button className="btn btn-sm btn-dark" onClick={onClick}>Submit</button>
//                 </form>

//             </div>

//         </div>
//     )

// }
// export default Ide;