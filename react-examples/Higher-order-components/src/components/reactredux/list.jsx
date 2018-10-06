import React from "react";
import { connect } from "react-redux";
import { removeArticle, updateArticle } from "../../actions/index";
const mapStateToProps = state => {
  return { articles: state.articles };
};
const mapDispatchToProps = dispatch => {
  return {
    removeArticle: articleId => dispatch(removeArticle(articleId)),
    updateArticle: articles => dispatch(updateArticle(articles))
  };
};
class ConnectedList extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      editItem : {}, 
      isEditMode: false
    };
    this.deleteItem = this.deleteItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.editItems = this.editItems.bind(this)
  }
 
  deleteItem(articleId) {
    this.props.removeArticle(articleId)
  }
  updateItem() {
    let id = this.state.editItem.id
    let title = this.state.title
    this.props.updateArticle({title: title, id: id})
    this.setState({isEditMode: false})
  }
  editItems(el) {
    this.setState({editItem: el, isEditMode: true})
  }
  render() {
    const { title } = this.state;
    let articles = this.props.articles
    return (
      <ul className="list-group list-group-flush">
      {articles.map((el, index) => (
        <li className="list-group-item" key={el.id}>
          {el.title} 
          <i className="fa fa-trash" aria-hidden="true" onClick={() => this.deleteItem(el.id)}></i>
          <i className="fa fa-pencil"  onClick={() => this.editItems(el)} aria-hidden="true"></i>
        </li>
      ))}
      {this.state.isEditMode ? <div><h1>Update section</h1><div className="form-group">
        <input type="text" className="form-control" defaultValue={this.state.editItem.title} onChange={(e)=> {this.state.title = e.target.value}}/>
        <button type="button" className="btn btn-success btn-block" onClick={this.updateItem}>
          UPDATE
        </button>
      </div></div> : ''
      }
    </ul>
    );
  }
}
// const ConnectedList = ({ articles }) => (
//   <ul className="list-group list-group-flush">
//     {articles.map((el, index) => (
//       <li className="list-group-item" key={el.id}>
//         {el.title} <i className="fa fa-trash" aria-hidden="true" onClick={this.props.deleteItem(index)}></i>
//       </li>
//     ))}
//   </ul>
// );
const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;