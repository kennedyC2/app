import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-5">
            <div className="container f-top w_1200 pt-5 d-lg-flex justify-content-between">
                <div className="px-2">
                    <div className="logo">
                        <h4>MARKIE</h4>
                    </div>
                    <div className="d-flex pt-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z" />
                                </g>
                            </svg>
                        </div>
                        <p className="ps-3 pt-1">30, Wetheral Road, Owerri, Imo state.</p>
                    </div>
                    <div className="d-flex pt-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M12.547 9.328a1.567 1.567 0 0 0-.594-.117a1.202 1.202 0 0 0-.555.101a2.762 2.762 0 0 0-.43.258a2.166 2.166 0 0 0-.359.328c-.104.12-.205.23-.304.329a2.409 2.409 0 0 1-.29.25a.534.534 0 0 1-.695-.063a32.17 32.17 0 0 1-.328-.312c-.14-.136-.312-.3-.515-.493A61.776 61.776 0 0 1 7.844 9l-.68-.664a25.847 25.847 0 0 1-1.21-1.266a5.312 5.312 0 0 1-.391-.484c-.094-.135-.141-.234-.141-.297a.46.46 0 0 1 .101-.312c.073-.094.16-.19.258-.29c.1-.098.209-.203.328-.312c.12-.11.23-.227.329-.352c.098-.125.182-.268.25-.43c.067-.16.101-.343.101-.546a1.567 1.567 0 0 0-.453-1.102a7.604 7.604 0 0 1-.531-.578a6.487 6.487 0 0 0-.617-.64a4.207 4.207 0 0 0-.696-.516A1.46 1.46 0 0 0 3.742 1a1.567 1.567 0 0 0-1.101.453c-.271.271-.508.513-.711.727a4.006 4.006 0 0 0-.516.664a2.63 2.63 0 0 0-.312.765A4.39 4.39 0 0 0 1 4.625c0 .552.089 1.125.266 1.719c.177.593.416 1.185.718 1.773c.302.589.67 1.167 1.102 1.735c.432.567.901 1.106 1.406 1.617c.505.51 1.042.982 1.61 1.414c.567.432 1.148.805 1.742 1.117c.593.313 1.19.557 1.789.734a6.157 6.157 0 0 0 1.75.266a4.696 4.696 0 0 0 1.008-.11a2.59 2.59 0 0 0 .773-.312c.23-.14.45-.312.664-.515c.214-.204.453-.438.719-.704A1.568 1.568 0 0 0 15 12.257a2.009 2.009 0 0 0-.102-.515a1.674 1.674 0 0 0-.257-.484a7.24 7.24 0 0 0-.368-.445a5.381 5.381 0 0 0-.421-.422a91.549 91.549 0 0 0-.43-.383a8.277 8.277 0 0 1-.367-.344a1.516 1.516 0 0 0-.508-.336zm-.367 4.586a3.13 3.13 0 0 1-.797.086a5.526 5.526 0 0 1-1.516-.242a8.362 8.362 0 0 1-1.586-.664a13.205 13.205 0 0 1-3.047-2.297a17.15 17.15 0 0 1-1.289-1.461a10.502 10.502 0 0 1-1.03-1.578a9.12 9.12 0 0 1-.673-1.61A5.308 5.308 0 0 1 2 4.602a3.34 3.34 0 0 1 .094-.79c.057-.218.143-.414.258-.585c.114-.172.255-.339.421-.5c.167-.162.357-.35.57-.563a.542.542 0 0 1 .4-.164c.062-.005.158.036.288.125c.13.089.271.195.422.32a7.058 7.058 0 0 1 .899.899c.125.15.229.289.312.414c.083.125.125.221.125.289a.429.429 0 0 1-.101.312c-.073.084-.16.18-.258.29c-.1.109-.209.213-.328.312c-.12.099-.23.216-.329.351a2.266 2.266 0 0 0-.25.438a1.345 1.345 0 0 0-.101.54c.005.213.047.413.125.6c.078.188.19.355.336.5l3.726 3.727a1.527 1.527 0 0 0 1.102.46a1.2 1.2 0 0 0 .547-.1a2.414 2.414 0 0 0 .789-.586c.11-.12.21-.23.305-.329c.093-.098.19-.182.289-.25a.545.545 0 0 1 .312-.101c.073 0 .172.042.297.125c.125.083.263.19.414.32c.151.13.307.274.469.43c.161.156.305.312.43.469c.124.156.229.297.312.422c.083.125.125.22.125.289a.533.533 0 0 1-.164.39c-.224.219-.414.41-.57.57a3.159 3.159 0 0 1-.5.422a1.93 1.93 0 0 1-.586.266zM15 1.704l-4.64 4.648h3.288v1h-5v-5h1V5.64L14.297 1l.703.703z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className="ps-3">+234 817 835 9407</p>
                    </div>
                    <div className="d-flex pt-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                <path fill="currentColor" d="M19 24H4L3.997 8.906l11.434 7.916a1 1 0 0 0 1.138 0L28 8.91V18h2V8a2.003 2.003 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v16a2.003 2.003 0 0 0 2 2h15Zm6.799-16L16 14.784L6.201 8Z" />
                                <circle cx="26" cy="24" r="4" fill="currentColor" />
                            </svg>
                        </div>
                        <p className="ps-3">kennedychidi55@gmail.com</p>
                    </div>
                </div>
                <div className="px-2">
                    <h2 className="f1">Catalogue:</h2>
                    <ul className="container f_list mt-3">
                        <li className="menu">
                            <Link to="/category/coats" state={{ collection: "coats", page: "1" }}>Wardcoats</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/scrubs" state={{ collection: "scrubs", page: "1" }}>Medical Scrubs</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/crocs" state={{ collection: "crocs", page: "1" }}>Crocs</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/sneakers" state={{ collection: "sneakers", page: "1" }}>Sneakers</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/pen_torch" state={{ collection: "penTorch", page: "1" }}>Pen Torch</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/scrub_caps" state={{ collection: "scrubCaps", page: "1" }}>Scrub Caps</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/id_card_holder" state={{ collection: "cardHolders", page: "1" }}>ID Card Holder</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/medical_brooches" state={{ collection: "brooches", page: "1" }}>Medical Brooches</Link>
                        </li>
                        <li className="menu">
                            <Link to="/category/inscription_t-shirts" state={{ collection: "inscription_shirts", page: "1" }}>Inscription T-shirt</Link>
                        </li>
                    </ul>
                </div>
                <div className="px-2">
                    <h2 className="f2">FOLLOW US</h2>
                    {/* Social Media Icons */}
                    <div className="social d-flex justify-content-start pt-3">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                <path fill="#ffffff" d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                                <path fill="#ffffff" d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3S645.3 585.4 645.3 512S585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165c-3.1-64-17.7-120.8-64.5-167.6c-46.9-46.9-103.6-61.4-167.6-64.5c-55.2-3.1-109.9-2.6-165-2.6c-55.2 0-109.9-.5-165 2.6c-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6c46.9 46.9 103.6 61.4 167.6 64.5c55.2 3.1 109.9 2.6 165 2.6c55.2 0 109.9.5 165-2.6c64-3.1 120.8-17.7 167.6-64.5c46.9-46.9 61.4-103.6 64.5-167.6c3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9S717.1 398.5 717.1 512S625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9s47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z" />
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                                <path fill="#ffffff" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm215.3 337.7c.3 4.7.3 9.6.3 14.4c0 146.8-111.8 315.9-316.1 315.9c-63 0-121.4-18.3-170.6-49.8c9 1 17.6 1.4 26.8 1.4c52 0 99.8-17.6 137.9-47.4c-48.8-1-89.8-33-103.8-77c17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35c25.1-4.7 49.1-14.1 70.5-26.7c-8.3 25.7-25.7 47.4-48.8 61.1c22.4-2.4 44-8.6 64-17.3c-15.1 22.2-34 41.9-55.7 57.6z" />
                            </svg>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                                <path fill="#ffffff" d="M16.8 5.7C14.4 2 9.5.9 5.7 3.2C2 5.5.8 10.5 3.2 14.2l.2.3l-.8 3l3-.8l.3.2c1.3.7 2.7 1.1 4.1 1.1c1.5 0 3-.4 4.3-1.2c3.7-2.4 4.8-7.3 2.5-11.1zm-2.1 7.7c-.4.6-.9 1-1.6 1.1c-.4 0-.9.2-2.9-.6c-1.7-.8-3.1-2.1-4.1-3.6c-.6-.7-.9-1.6-1-2.5c0-.8.3-1.5.8-2c.2-.2.4-.3.6-.3H7c.2 0 .4 0 .5.4c.2.5.7 1.7.7 1.8c.1.1.1.3 0 .4c.1.2 0 .4-.1.5c-.1.1-.2.3-.3.4c-.2.1-.3.3-.2.5c.4.6.9 1.2 1.4 1.7c.6.5 1.2.9 1.9 1.2c.2.1.4.1.5-.1s.6-.7.8-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.5.3c.1.3.1.7-.1 1z" />
                            </svg>
                        </div>
                    </div>

                    <div className="pt-5">
                        <h2 className="f3">SIGN UP FOR NEWSLETTER</h2>
                        <p className="pt-3">Receive our latest updates about our products & promotions</p>
                        <form className="row g-2">
                            <div className="col-auto">
                                <label htmlFor="news" className="visually-hidden"></label>
                                <input type="email" className="form-control" id="news" placeholder="Email Address" />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-danger mb-3 px-4">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="f-bottom opg mt-5">
                {/* Payment Methods */}
                <div className="w_1200 p-3">© 2022, Markie Stores. All Rights Reserved</div>
            </div>
        </footer>
    );
};

export default Footer;
