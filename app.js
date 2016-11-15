const List = React.createClass({
    getInitialState(){
        return{
            key:0,
            list:new Map()
        }
    },

    add(){
        const key=++this.state.key;
        this.state.list.set(key,"");
        this.forceUpdate();
        console.log(this.state.list);
    },

    removeItem(id){
        this.state.list.delete(id);
        this.forceUpdate();
    },

    save(key,value){
        this.state.list.set(key,value);
        this.forceUpdate();
    },

    render(){
        const listDOM = [];

        for(let entity of this.state.list){
            listDOM.push(<Item id={entity[0]} key={entity[0]} value={entity[1]} onRemove={this.removeItem} onSave={this.save}/>);
        }

        return(
            <div>
                <button className="btn btn-default" onClick={this.add}>添加</button>
                <ul className="list-group">
                    {listDOM}
                </ul>
            </div>
        );
    }
});

const Item = React.createClass({
    getInitialState(){
        return{
            isEditor:true
        }
    },

    remove(){
        this.props.onRemove(this.props.id);
    },

    save(){
        this.props.onSave(this.props.id,this.refs.inputText.value);
        this.setState({isEditor:false});
    },

    edit(){
        this.setState({isEditor:true});
    },


    render(){
        return (
            this.state.isEditor?
                <li id={this.props.id} className="list-group-item">
                    KEY对应值：{this.props.id}&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" className="item-edit" ref="inputText" defaultValue={this.props.value} />
                    <a href="#" className="glyphicon glyphicon-saved" onClick={this.save}></a>
                    <a href="#" className="glyphicon glyphicon-remove" onClick={this.remove}></a>
                </li>
                :
                <li className="list-group-item">
                    KEY对应值：{this.props.id}&nbsp;&nbsp;&nbsp;&nbsp;{this.props.value}
                    <a href="#" className="right glyphicon glyphicon-edit" onClick={this.edit}></a>
                    <a href="#" className="right glyphicon glyphicon-remove" onClick={this.remove}></a>
                </li>
        );
    }
});

ReactDOM.render(
    <List />
    ,
    document.getElementById('test')
);