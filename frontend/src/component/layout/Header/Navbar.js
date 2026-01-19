import PlaceIcon from "@mui/icons-material/Place";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ErrorIcon from '@mui/icons-material/Error';
import './Navbar.css';
import { useSelector, useDispatch } from "react-redux";
import { getProduct, getSearchProductResult } from "../../../actions/productAction";
import { useEffect, useRef } from "react";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "./UserMenu.js";
import {Skeleton} from "./Skeleton.js";

export const Navbar = () => {
    const SEARCH_DEBOUNCE_DELAY = 1000;
    const {isAuthenticated, user, loading:userLoading} = useSelector((state) => state.user);
    const {searchResult, loading, error, searchEmpty} = useSelector((state) => state.searchResult);
    const {cartItems} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const controller = useRef(null);
    const suggestionBoxRef = useRef(null);

    // Function to get the products based on input from user
    const onChangeKeywordHandleSearch = (e) => {
        e.preventDefault();

        // Suggestion Box Element
        const suggestionBox = suggestionBoxRef.current.querySelector('.suggestionBox');

        // Get all Products based on input from user and show search box
        if (e.target.value !== '') {
            suggestionBox.style.height = 'auto';
            suggestionBox.style.visibility = 'visible';
            dispatch(
                getSearchProductResult(e.target.value, 1, [0, 200000], '', 0)
            );
        }
    };


    // Search Debounding Sub Function - run onChangeKeywordHandleSearch on timeout, Create abort-event-Listener
    const delaySuggestionBoxResult = (e, ms, signal) => new Promise((res) => {

        // Set timeout
        const timer = setTimeout(() => res(onChangeKeywordHandleSearch(e)), ms)

        // Abort Event listener
        signal.addEventListener('abort', () => { 
            clearTimeout(timer);
         }, { once: true });
    });


    // Search Debouncing Function Main
    const handleOnChangeKeywordFunc = async (e, ms) => {
        // Clear the Previous search results when the input from user is updated
        if (e.target.value === '') {
            suggestionBoxRef.current.querySelector('.suggestionBox').style.height = '0';
            suggestionBoxRef.current.querySelector('.suggestionBox').style.visibility = 'hidden';
            dispatch({
                type: 'SEARCH_PRODUCT_CLEAR',
            });
            if (controller.current) {
                controller.current.abort();
            }
            return;
        }

        // Trigger abort event to cancel any pending search result
        if (controller.current) {
            controller.current.abort();
        }

        // Create new AbortController object for the current keyword
        controller.current = new AbortController();

        // Main delay(debouncing) function of SuggestionBox
        await delaySuggestionBoxResult(e, ms, controller.current.signal);           
    }


    // function to navigate to all products page and filter search result from the input keyword
    const fullSearch = (e, type) => {
        e.preventDefault();

        // Abort any pending keystroke delay search
        controller.current?.abort();

        // Select the suggestion box and input field
        const sugBox = suggestionBoxRef.current.querySelector('.suggestionBox');
        const navbarInput = suggestionBoxRef.current.querySelector('.navBarSearchbox');

        // Hide the suggestion box
        sugBox.style.height = '0';
        sugBox.style.visibility = 'hidden';

        // Navigate to the products page with the search keyword
        navigate(`/products?keyword=${navbarInput.value}`);
        dispatch(getProduct(navbarInput.value, 1, [0, 200000], '', 0));
    }

    // Search Result
    const renderSearchResults = () => {       
        // Show <loader/> if loading        
        if (loading) return <Loader style={{ height: '100%' }} />

        // If error show error, if no result found show the message
        if(searchEmpty || !searchResult || searchResult.length === 0) {
            return (
                <div className="noItem">
                    {error && <ErrorIcon/>}
                    {`${error ? 'Failed to get data. Try again!' : 'No Items Found'}`}
                </div>
            )
        }

        // If there is any result, show it
        return searchResult.map((item) => (
            <a key={item._id} href={`/product/${item._id}`} className="suggestionItem">
                <div className="tumbnailPrev">
                    <img alt="thumbnail" src={item.images.length > 0 && item.images[0].url} />
                </div>
                <div className="descPrev">{item.name}</div>
                <div className="price">{`₹ ${item.price}`}</div>
            </a>
        ));
            
    }

    useEffect(() => {

        // hide search box when clicked outside suggestion box
        const handleClickOutside = (event) => {
            if (suggestionBoxRef?.current && !suggestionBoxRef.current.contains(event.target)) {
                const suggestionBoxRefChild = suggestionBoxRef.current.querySelector('.suggestionBox');
                suggestionBoxRefChild.style.height = '0';
                suggestionBoxRefChild.style.visibility = 'hidden';;
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="navBarCustom">
            {/* ---------------------------------------------- Company Logo -------------------------------------------------*/}
            <a href="/" className="navBarLogo">ECOMMERCE</a>


            {/* ----------------------------------------------- Search Box -------------------------------------------------*/}
            <div className="navBarSearchboxWrap" ref={suggestionBoxRef}>
                <form className="navBarSearchboxForm" onSubmit={(e) => fullSearch(e, 'form')}>
                    <input type="text" className="navBarSearchbox" onChange={(e) => handleOnChangeKeywordFunc(e, SEARCH_DEBOUNCE_DELAY)}/>
                </form>
                <div className="searchIcon"  onClick={(e) => fullSearch(e, 'searchIcon')}><SearchIcon/></div>
                <div className="suggestionBox">
                    {renderSearchResults()}
                    <div className="seeAllResults"><button onClick={(e) => fullSearch(e, 'seeAllResult')}>See All Results</button></div>
                </div>
            </div>


            {/* ---------------------------------------------- Navigation Links -------------------------------------------------*/}
            <div className="nav-links">

                {/* ------------------------------- Location Section -------------------------------------- */}
                    <div className="nav-link-item LocationInfo">
                        {/* TODO: Create Selection of Location feature */}
                        <div className="nav-link-item-sub locationInfoSub">
                            <div className="locationSub">
                                Location
                                <PlaceIcon />
                            </div>
                            <div className="stateAreaPincode">Select your Location</div>
                        </div>
                        <div className="changeLocationBox">
                            <div className="locationBoxLabel" >Enter your location</div>
                            <input type="text" size="10" className="locationBoxInput"/>
                            <input type="button" value="Change" className="locationBoxSubmit"/>
                        </div>
                    </div>


                {/* ---------------------------------- All Products Page Link ------------------------------------- */}
                <a href="/products" className="nav-link-item">
                    <div className="nav-link-item-sub">Products</div>
                </a>


                {/* ---------------------------------- Accounts Section -------------------------------------------- */}
                <div className="nav-link-item accountLoginSignup">
                        {userLoading ? <Skeleton/> : <a href={`${isAuthenticated ? "/account" : "/login"}`} className="nav-link-item-acc nav-link-item-sub" >
                            <AccountCircleOutlinedIcon/>
                            <div>{`${isAuthenticated ? 
                                user.name : 
                                "Login/Signup"}`}
                            </div>
                        </a>}
                    {isAuthenticated && <UserMenu />}
                </div>


                {/* ---------------------------------- Cart Section -------------------------------------------- */}
                <div className="nav-link-item">
                    <a href="/cart" className="nav-link-item-sub cartInfo">
                        <div className="cartInfoSub">
                            {
                            cartItems && cartItems.length > 0 &&
                                <div className="cartItems">{cartItems.length}</div>
                            }
                            <ShoppingCartOutlinedIcon/>
                        </div>                        
                        <div>Cart</div>
                    </a>
                </div>
            </div>
        </nav>
        );
};