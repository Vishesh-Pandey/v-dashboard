import React from "react";

const Goals = () => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <button
            data-bs-toggle="modal"
            data-bs-target="#weekModal"
            className="btn btn-primary w-100"
          >
            Week
          </button>
        </div>
        <div className="col">
          <button
            data-bs-toggle="modal"
            data-bs-target="#monthsModal"
            className="btn btn-primary w-100"
          >
            Months
          </button>
        </div>
      </div>

      {/* Modal  for Months */}
      <div
        className="modal fade modal-xl"
        id="monthsModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Monthly Goals
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  {months.map((month, index) => {
                    return (
                      <div className="col-md-4">
                        <div className="card text-bg-light mb-3">
                          <div className="card-header">{month}</div>
                          <div className="card-body p-0">
                            <textarea
                              className="form-control"
                              placeholder="Write your goals here"
                              id="floatingTextarea2"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal  for Week */}
      <div
        className="modal fade modal-xl"
        id="weekModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Monthly Goals
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  {week.map((month, index) => {
                    return (
                      <div className="col-md-4">
                        <div className="card text-bg-light mb-3">
                          <div className="card-header">{month}</div>
                          <div className="card-body p-0">
                            <textarea
                              className="form-control"
                              placeholder="Write your goals here"
                              id="floatingTextarea2"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
