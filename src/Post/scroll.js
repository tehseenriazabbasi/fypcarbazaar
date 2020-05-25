import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './scroll.css';
import {list} from "./apiPost"


const list2=[
    {"_id":"5e231de451b4d50838f46180","title":"mypost","body":"asdasdasd","price":"111111111","created":"2020-01-18T15:01:56.731Z","postedBy":{"_id":"5dbaddc320f3152f20b926bf","name":"Khizar Khan"}},{"photo":["\\images\\0.3617908863087933cc_2019hoc020019_02_640_gy.jpg"],"likes":[],"status":"active","_id":"5de81d9f6a775327c8ada261","title":"Honda City","body":"10/10 Condition","price":"11250000","created":"2019-12-04T20:57:03.335Z","postedBy":{"_id":"5dbaddc320f3152f20b926bf","name":"Khizar Khan"}}]


// list1 of items
const list1 = [
    { title: 'item1' },
    { title: 'item2' },
    { title: 'item3' },
    { title: 'item4' },
    { title: 'item5' },
    { title: 'item6' },
    { title: 'item7' },
    { title: 'item8' },
    { title: 'item9' }
];

// One item component
// selected prop will be passed
// const MenuItem = ({text, selected}) => {
//     /*const text1 = this.props.title;*/
//     /*console.log("props",this.props)*/;
//     console.log("asdsad");
//     return <div
//         className={`menu-item ${selected ? 'active' : ''}`}
//     >{text}</div>;
// };

const MenuItem = ({text}) => {
    // const text1 = this.props.title;
    /*console.log("props",this.props);*/
    // console.log(text1);
    console.log("asdas");
    return <div>{text}</div>;
};


// All items component
// Important! add unique key
export const Menu = (list_x) =>

    list_x.map(el => {
        const {title,_id} = el;
        console.log(title);
        /*console.log("title", title);
        console.log("id", _id);
        console.log("el", el);*/

        // return <MenuItem text={title} key={_id}/>;
        return <div>{title}</div>;
    });


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'mypost';

class scroll extends Component {
    constructor() {
        super();
        // call it again if items count changes
        // this.menuItems = Menu(list2);

    }

    componentWillMount() {
        // this.menuItems = Menu(list1);

        // this.menuItems = Menu(list2);

        list().then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else {
                /*/!*const list3 = data;
                console.log(list3)*!/;*/
                this.setState({posts: data});
                this.menuItems = Menu(data);
                console.log(this.menuItems)
            }

        });
    }

    state = {
        selected,
        posts: []
    };

    onSelect = key => {
        this.setState({ selected: key });
    };


    render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className="App">
                <ScrollMenu
                    data={menu}
                    arrowLeft={ArrowLeft}
                    arrowRight={ArrowRight}
                    selected={selected}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}
export default scroll;