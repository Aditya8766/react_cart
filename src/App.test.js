import { render,screen,fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';


describe("App",()=>{


  beforeEach(()=>{
    global.fetch = jest.fn(()=>{
      Promise.resolve({
        json: ()=>
        Promise.resolve({ products:[{id:"1",title:"abc",price:"530"}] })
      })
    });
  });
  afterAll(()=>{
    jest.clearAllMocks();
  });
  
  test('renders learn react link', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should add value when button is clicked",async()=>{   
   let app; 
   await act(async()=>{
    app = render(<App />);
  });
  const btn = app.container.querySelector("button")
  fireEvent.click(btn);
  
  });
  it("Should remove value when button is clicked",async()=>{   
    let app; 
    await act(async()=>{
     app = render(<App />);
   });
   const btn = app.container.querySelector(".product__btn2")
   fireEvent.click(btn);
   
   });
});

