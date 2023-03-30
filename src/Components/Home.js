import React, { useEffect, useState } from "react";
export default function Home() {
  const [inputname, setInputname] = useState([]);
  const allitem = require("../all_fields.json");
  const choise = require("../prompt_filter.json");
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    console.log("('-') ====>", choise);
    console.log("ALL DATA IN JSON FILE ==>>", allitem);
    const tempitem = [];
    let data = choise.filter.rules;

    function modify(obj, array) {
      if (!array) {
        array = [];
      } else {
        obj.map((item) => {
          if (!item.rules) {
            if (item.prompt) {
              array.push(item);
            }
          } else {
            modify(item.rules, array);
          }
        });
      }
    }
    modify(data, tempitem);

    setTemp(tempitem);

    const para = [];
    allitem.map((item) => {
      function doc(obj, array) {
        if (!array) {
          array = [];
        } else {
          if (!obj.refFields.length) {
            temp.map((objs) => {
              if (objs.field === obj.key) {
                setInputname((preValue) => [...preValue, obj]);
                para.push(obj);
              }
            });
          } else {
            obj.refFields.map((itm) => {
              doc(itm, array);
            });
          }
        }
      }
      doc(item, para);
    });
    setInputname(para);

    console.log("inputname =====------>", inputname);
    console.log("TEMP ===--->", temp);
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="mb-5"> Selected Inputes </h1>
      <form>
        <div className="row">
          {inputname &&
            inputname.map((item) => {
              return (
                <div className="col-12 col-md-6 my-2">
                  <div class="form-group row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">
                      {item.name} :
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="password"
                        class="form-control"
                        id="inputPassword"
                        placeholder={`Enter ${item.name}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
}
