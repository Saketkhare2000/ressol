import React from "react";
import "./style.css";
import data from "../../postDetails.json";
const PostProperty = () => {
  return (
    <div>
      <h3 className="mobile-title">Sell or Rent your Property</h3>
      <form action="" className="post-property">
        {data.map((item, index) => {
          return (
            <div key={index} className="form-group">
              <h2 className="header-mobile">{item.title}</h2>
              <div className="form-category">
                <label htmlFor="select"> {item.category.name}</label>
                <select name="" id="">
                  {item.category.options.map((option, index) => {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <hr />
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default PostProperty;
