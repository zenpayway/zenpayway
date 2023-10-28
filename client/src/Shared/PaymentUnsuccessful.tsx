const PaymentUnsuccessful = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 mx-auto text-center">
                    <div className="red-background"> {/* Applying green color to the text */}
                        <b>Your transaction was canceled!</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentUnsuccessful;
