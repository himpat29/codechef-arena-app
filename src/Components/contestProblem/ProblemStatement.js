import React from "react";
import { Markdown } from "react-showdown";
import Styled from "styled-components";

window.MathJax = {
  loader: { load: ["input/asciimath"] },
  startup: {},
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    processEscapes: true
  }
};

const Root = Styled.div`
  width:80%;
  padding-right: 30px;
  padding-top: 30px;
  font-size:20px;
`;

class ProblemStatement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps({ statement }) {
    const arr = statement.split("### ");

    let parts = [];
    parts.push({ body: arr[1], line: true });

    for (let i = 2; i < arr.length; i++) {
      const str = arr[i];
      for (let j = 0; j < str.length; j++) {
        const c = str[j];
        const isChar =
          (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === " ";
        if (!isChar) {
          parts.push({
            head: str.substr(0, j),
            body: str.substr(j, str.length - j),
            line: !(i === arr.length - 1)
          });
          break;
        }
      }
    }
    for (let i = 0; i < parts.length; i++) {
      parts[i].key = i;
    }
    return { parts };
  }

//   setMathJax() {
//     if (window.MathJax) {
//       window.MathJax.tex = {
//         inlineMath: [
//           ["$", "$"],
//           [String.raw`\\(`, String.raw`\\)`]
//         ],
//         processEscapes: true
//       };
//     }
//   }


  render() {
    const { parts } = this.state;
    return (
        // <div contentEditable = "true">{this.props}</div>
      <Root>
          {/* <div contentEditable = "true">parts</div> */}
        {parts.map(p => {
          return !p.head && !p.body ? (
            ""
          ) : (
            <div key={p.key}>
              {p.head ? <h3>{p.head}</h3> : ""}
              {
                <div>
                  <Markdown
                    markup={p.body.replace("`", "")}
                  />
                </div>
              }
              {p.line ? <hr /> : ""}
            </div>
          );
        })}
      </Root>
    );
  }
}

export default ProblemStatement;