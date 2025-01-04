import Lottie from 'react-lottie';
import React, {CSSProperties, ReactElement, ReactNode} from 'react';
import s from './style.css';

interface HomeSectionProps {
    index: number;
    title: string;
    description: ReactNode;
    animationData?: any;
    animationComponent?: ReactElement;
    animationContainerStyle?: CSSProperties;
    animationStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    theme?: string;
    infoContainerStyle?: CSSProperties;
    containerStyle?: CSSProperties;
}

const AnimationComponent = ({
    animationData,
    animationComponent,
    animationContainerStyle,
    animationStyle,
}: {
    animationData: any;
    animationComponent: ReactElement | undefined;
    animationContainerStyle?: CSSProperties;
    animationStyle?: CSSProperties;
}) => {
    const isMobile = window.innerHeight > window.innerWidth;
    return (
        <div style={{flex: 0.5, ...animationContainerStyle}}>
            {animationComponent || (
                <Lottie
                    options={{
                        loop: true,
                        animationData,
                    }}
                    height={animationStyle?.height || (isMobile ? 250 : 300)}
                    width={animationStyle?.width || (isMobile ? 250 : 300)}
                    isStopped={false}
                    isPaused={false}
                />
            )}
        </div>
    );
};

const InfoComponent = ({
    title,
    description,
    titleStyle,
    isEven,
    theme,
    infoContainerStyle,
}: {
    title: string;
    description: ReactNode;
    titleStyle?: CSSProperties;
    isEven: boolean;
    theme?: string;
    infoContainerStyle?: CSSProperties;
}) => (
    <div style={{flex: 0.5, paddingTop: window.innerWidth > window.innerHeight ? '5vh' : 0, ...infoContainerStyle}}>
        <p
            className={s.heading}
            style={{color: (isEven && theme !== 'dark') || theme === 'light' ? '#0F0F28' : '#fff', ...titleStyle}}>
            {title}
        </p>
        <p
            className={`${s.description} ${s.description2}`}
            style={{color: (isEven && theme !== 'dark') || theme === 'light' ? '#0F0F28' : '#fff'}}>
            {description}
        </p>
    </div>
);

const HomeSection = ({
    index,
    title,
    description,
    animationData,
    animationComponent,
    animationContainerStyle,
    animationStyle,
    titleStyle,
    theme,
    infoContainerStyle,
    containerStyle,
}: HomeSectionProps) => {
    const isEven = index % 2 === 0;
    const isMobile = window.innerHeight > window.innerWidth;
    return (
        <div
            className={s.sectionContainer}
            style={{
                background: (isEven && theme !== 'dark') || theme === 'light' ? '#fff' : '#000',
                ...containerStyle,
            }}>
            <div className={s.section}>
                {isEven && !isMobile ? (
                    <AnimationComponent
                        animationData={animationData}
                        animationComponent={animationComponent}
                        animationContainerStyle={animationContainerStyle}
                        animationStyle={animationStyle}
                    />
                ) : (
                    <InfoComponent
                        title={title}
                        description={description}
                        titleStyle={titleStyle}
                        isEven={isEven}
                        theme={theme}
                        infoContainerStyle={infoContainerStyle}
                    />
                )}
                {isEven && !isMobile ? (
                    <InfoComponent
                        title={title}
                        description={description}
                        titleStyle={titleStyle}
                        isEven={isEven}
                        theme={theme}
                        infoContainerStyle={infoContainerStyle}
                    />
                ) : (
                    <AnimationComponent
                        animationData={animationData}
                        animationComponent={animationComponent}
                        animationContainerStyle={animationContainerStyle}
                        animationStyle={animationStyle}
                    />
                )}
            </div>
        </div>
    );
};

export default HomeSection;
