type AppLogoIconProps = {
    className?: string;
};

export default function AppLogoIcon({ className = '' }: AppLogoIconProps) {
    const imageUrl = '/images/TI_logo.png';
    return (
        <img src={imageUrl} alt="My Image" className={className} />
    );
}
