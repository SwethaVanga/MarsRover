import React from "react";
import { shallow } from 'enzyme';
import renderer from "react-test-renderer";
import ButtonBase from "./index";

test("Should render button component with props", () => {
    const component = renderer.create(<ButtonBase clickAction={()=> {}} title={"Run"} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("Test click event", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<ButtonBase clickAction={mockCallBack} title={"Hide"} />);
    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
});
