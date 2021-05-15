import React, { useState, useEffect } from "react";
import { Input, Button, Modal, Popconfirm, message } from "antd";
import { CategoryValues, CategoryTypes, CategoryEdit } from "./extranalData";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState(CategoryValues);
  const [categoryEdit, setCategoryEdit] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadCategory, setLoadCategory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messagelog, setMessage] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeHandler = (type) => (e) => {
    setCategory({
      ...category,
      [type]: e.target.value,
    });
  };
  const onFocusHandler = (type) => (e) => {
    if (e.target.value == "0.00") {
      setCategory({
        ...category,
        [type]: "",
      });
    }
  };
  const onFocusOutHandler = (type) => (e) => {
    if (e.target.value == "") {
      setCategory({
        ...category,
        [type]: "0.00",
      });
    }
  };
  const onChangeSelectHandler = (e) => {
    setCategorySelect(e.target.value);
    getFrechApi(e.target.value);
  };
  const onChangeEditHandler = (type) => (e) => {
    setCategoryEdit(e.target.value);
  };
  const getFrechApi = async (id) => {
    const url = `http://localhost:5000/Admin/category/${id}`;
    const result = await axios.get(url);

    setCategoryEdit(result && result.data ? result.data.price : "");
  };

  const fetchApi = async () => {
    const result = await axios.get("http://localhost:5000/Admin/category");

    setLoadCategory(result ? result.data : []);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  const addCategory = async () => {
    setLoading(true);
    const result = await axios.post(
      "http://localhost:5000/Admin/category",
      category
    );

    if (result.data.success) {
      setMessage(result.data.message);

      showModal();
    } else if (result.status == 400) {
      setMessage(result.data.message);

      showModal();
    }
    if (result && result.data) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  function confirm(e) {
    deleteCategory();
  }

  function cancel(e) {}
  const putCategory = async () => {
    const url = `http://localhost:5000/Admin/category/${categorySelect}`;
    const result = await axios.put(
      url,

      { categoryName: categorySelect, price: categoryEdit }
    );
    if (result.status == 200) {
      setMessage(result.data);

      showModal();
    } else if (result.status == 400) {
      setMessage(result.data.message);

      showModal();
    }
  };
  const deleteCategory = async () => {
    const url = `http://localhost:5000/Admin/category/${categorySelect}`;
    const result = await axios.delete(url);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Add Category</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Enter Category Name</label>
                <Input
                  placeholder="Basic usage"
                  value={category.categoryName}
                  onChange={onChangeHandler(CategoryTypes.category)}
                />
              </div>
              <div className="form-group">
                <Input
                  placeholder="Amount"
                  value={category.price}
                  onChange={onChangeHandler(CategoryTypes.price)}
                  onFocus={onFocusHandler(CategoryTypes.price)}
                  onBlur={onFocusOutHandler(CategoryTypes.price)}
                />
              </div>

              <Button type="primary" onClick={addCategory} loading={loading}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Edit Category</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Category Name</label>
                <select
                  className="form-control"
                  value={categorySelect}
                  onChange={onChangeSelectHandler}
                >
                  {loadCategory.length > 0 &&
                    loadCategory.map((element, index) => (
                      <option value={element._id} key={index}>
                        {element.categoryName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <Input
                  placeholder="Amount"
                  value={categoryEdit}
                  onChange={onChangeEditHandler(CategoryTypes.priceedit)}
                />
              </div>

              <Button type="primary" onClick={putCategory}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
              <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                {messagelog}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
