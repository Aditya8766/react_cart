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
  const container1 = app.container.querySelector(".container button")
  expect(container1.textContent).toBe("add");
  fireEvent.click(container1);
  const btn1 = app.container.querySelector(".cart h5");
  expect(btn1.textContent).toBe("products:iPhone 9");
  });

  it("Should remove value when button is clicked",async()=>{   
    let app; 
    await act(async()=>{
     app = render(<App />);
   });
   const container1 = app.container.querySelector(".container button")
   expect(container1.textContent).toBe("add");
   fireEvent.click(container1);
   const btn2 = app.container.querySelector(".cart button");
   expect(btn2.textContent).toBe("remove");
   fireEvent.click(btn2)
   });

   it("Should give total of added items in cart",async()=>{
    let app;
    await act(async()=>{
      app = render(<App />);
    });
   const total = app.container.querySelector(".container button")
   expect(total.textContent).toBe("add");
   fireEvent.click(total);
   const total1 = app.container.querySelector(".container button")
   expect(total1.textContent).toBe("add");
   fireEvent.click(total1);
   })
});

