import './connect-metamask.css';

function ConnectMetamask(props: { onPressLogout: any, onPressConnect: any, loading: any, address: any }) {

    return (
        <div>
            {props.address && !props.loading ? (
                <button onClick={() => props.onPressLogout()} className="connect-wallet">
                    Disconnect
                </button>
            ) : props.loading ? (
                <button
                    className="connect-wallet connect-button-loading"
                    disabled
                >
                    <div>Loading...</div>
                </button>
            ) : (
                <button onClick={() => props.onPressConnect()} className="connect-wallet">
                    Connect with Metamask
                </button>
            )}
        </div>
    )
}

export default ConnectMetamask