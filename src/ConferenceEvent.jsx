import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "./venueSlice";
import {
  incrementAvQuantity,
  decrementAvQuantity,
} from "./avSlice";
import { toggleMealSelection } from "./mealsSlice"; // Meal slice import

const ConferenceEvent = () => {
  const [showItems, setShowItems] = useState(false);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals); // Get meals items from Redux
  const dispatch = useDispatch();
  const remainingAuditoriumQuantity =
    3 - venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)").quantity;

  const handleToggleItems = () => {
    setShowItems(!showItems);
  };

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    dispatch(toggleMealSelection(index)); // Dispatch action to toggle meal selection
  };

  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        if (item.selected) {
          totalCost += item.cost;
        }
      });
    }
    return totalCost;
  };

  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (!showItems) {
        setShowItems(true);
      }
    }
  };

  return (
    <>
      <navbar className="navbar_event_conference">
        <div className="company_logo">Conference Expense Planner</div>
        <div className="left_navbar">
          <div className="nav_links">
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
          <button className="details_button" onClick={handleToggleItems}>
            Show Details
          </button>
        </div>
      </navbar>

      <div className="main_container">
        {!showItems ? (
          <div className="items-information">
            {/* Venue Section */}
            <div id="venue" className="venue_container container_main">
              <div className="text">
                <h1>Venue Room Selection</h1>
              </div>
              <div className="venue_selection">
                {venueItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      {item.name === "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-minus btn-warning"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className={
                              item.quantity === 0
                                ? "btn-warning btn-disabled"
                                : "btn-warning btn-plus"
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className="selected_count">
                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                          </span>
                          <button
                            className={
                              item.quantity === 10
                                ? "btn-success btn-disabled"
                                : "btn-success btn-plus"
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${venueTotalCost}</div>
            </div>

            {/* Add-ons Section (AV Items) */}
            <div id="addons" className="venue_container container_main">
              <div className="text">
                <h1>Add-ons Selection</h1>
              </div>
              <div className="addons_selection">
                {avItems.map((item, index) => (
                  <div className="venue_main" key={index}>
                    <div className="img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className="button_container">
                      <button
                        className={
                          item.quantity === 0
                            ? "btn-warning btn-disabled"
                            : "btn-warning btn-minus"
                        }
                        onClick={() => handleDecrementAvQuantity(index)}
                      >
                        &#8211;
                      </button>
                      <span className="selected_count">
                        {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                      </span>
                      <button
                        className={
                          item.quantity === 10
                            ? "btn-success btn-disabled"
                            : "btn-success btn-plus"
                        }
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${avTotalCost}</div>
            </div>

            {/* Meals Section */}
            <div id="meals" className="venue_container container_main">
              <div className="text">
                <h1>Meals Selection</h1>
              </div>
              <div className="meal_selection">
                {mealsItems.map((item, index) => (
                  <div className="meal_item" key={index}>
                    <div className="meal_name">{item.name}</div>
                    <div className="meal_cost">${item.cost}</div>
                    <div className="meal_checkbox">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => handleMealSelection(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="total_cost">Total Cost: ${mealsTotalCost}</div>
            </div>
          </div>
        ) : (
          <div className="total_amount_detail">
            <TotalCost
              handleClick={handleToggleItems}
              totalCosts={{ venueTotalCost, avTotalCost, mealsTotalCost }} // Include meals cost in total
              ItemsDisplay={() => null} // Update this later
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvent;