import "./App.css";
import ViewSaleItems from "./components/DisplaySaleItems";
import { ItemContextProvider } from "./sale.item.context";
const App = () => {
  return (
    <>
      <ItemContextProvider>
        <div  className="grid h-screen place-items-center bg-slate-400 ">
          <div className=" flex flex-col h-screen place-items-center w-4/6 border-2 bg-slate-700">
            <div className=" grid  place-items-center bg-slate-800 w-5/6">
              <span className="flex italic md:no-italic text-2xl font-bold text-white p-3">
                Welcome to Sale Item Order
              </span>
            </div>
            <div  className=" mt-5  w-5/6">
              <ViewSaleItems />
            </div>
          </div>
        </div>
      </ItemContextProvider>
    </>
  );
};

export default App;
