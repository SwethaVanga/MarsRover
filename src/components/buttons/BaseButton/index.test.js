import React from "react";
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from "react-test-renderer";
import ButtonBase from "./index";

configure({ adapter: new Adapter() })

test("Should render button component with props", () => {
    const component = renderer.create(<ButtonBase clickAction={()=> {}} title={"Run"} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
