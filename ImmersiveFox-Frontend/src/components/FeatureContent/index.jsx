
import styles from "./styles.module.scss";
const FeatureContent = ({title, description, Icon, index}) => {
    return (
        <div className={styles.featureCard}
            data-aos="fade-left"
            data-aos-delay={`${index + 2}00`}>
            <div className={styles.featureCardIcon}>
                <Icon />
            </div>
            <div className={styles.featureCardText}>
                <p><span>{title}</span> - {description}</p>
            </div>
        </div>
    )
}
 
export default FeatureContent