import { useReducer, useState } from "react";

let initialValue = {
  isLoading: false,
  isError: false,
  data: [],
  token: ""
};

const githubLoadingAction = { type: "FETCH_GITHUB_USER_LOADING" };
const githubSuccessAction = { type: "FETCH_GITHUB_USER_SUCCESS" };
const githubErrorAction = { type: "FETCH_GITHUB_USER_FAILURE" };

const handlekaro = (dispatch, query) => {
  dispatch(githubLoadingAction);
  fetch("https://api.github.com/search/users?" + `q=${query}`)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res)
      dispatch({ ...githubSuccessAction, payload: res.items });
    })
    .catch((err) => {
      dispatch(githubErrorAction);
    });
};

function ReduceFunction(state, action) {
  // console.log(action)
  switch (action.type) {
    case "FETCH_GITHUB_USER_LOADING": {
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    }
    case "FETCH_GITHUB_USER_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    }
    case "FETCH_GITHUB_USER_FAILURE": {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    }
    default:
      return state;
  }
}

export default function GitHubPage() {
  const [text, setText] = useState("");
  const [state, dispatch] = useReducer(ReduceFunction, initialValue);

  return (
    <div>
      <input
        type="text"
        placeholder="wriet something"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button
        onClick={() => {
          handlekaro(dispatch, text);
        }}
      >
        Search
      </button>

      <div>
        {console.log(state)}
        {state.data.map((item) => (
          <div key={item.login}>{item.login}</div>
        ))}
      </div>
    </div>
  );
}
