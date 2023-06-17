//Import loader-styles
import './loader-styles.css'

export default function Loader() {
    return (
        <div className="studio-loader">
            <div className="lds-grid">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    );
}
