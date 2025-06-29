import React from 'react';
import gs from '../global.css';

const CSAEPolicy: React.FC = () => {
    const isDesktop = window.innerWidth > window.innerHeight;

    return (
        <div className={gs.main}>
            <div
                className={gs.screenContainer}
                style={{
                    paddingTop: isDesktop ? '15vh' : '13vh',
                    paddingLeft: '5%',
                    paddingRight: '5%',
                    lineHeight: 1.6,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    maxWidth: 800,
                    margin: '0 auto',
                }}>
                <h1>Child Sexual Abuse and Exploitation (CSAE) Prevention Standards</h1>

                <p>
                    At <strong>Sticknet</strong>, we are committed to preventing the spread of child sexual abuse and
                    exploitation (CSAE) material. We strictly prohibit any content or behavior that involves CSAE, and
                    we take immediate action against such violations.
                </p>

                <h2>1. Zero Tolerance Policy</h2>
                <p>
                    We do not allow any content that depicts or promotes CSAE. Violators will be banned, and content
                    will be reported to relevant authorities.
                </p>

                <h2>2. User Reporting Mechanism</h2>
                <p>
                    Users can report abusive or inappropriate content through our in-app feedback and reporting system.
                    All reports are reviewed promptly by our moderation team.
                </p>

                <h2>3. Content Moderation</h2>
                <p>
                    Our team actively monitors flagged content and removes CSAE material immediately. Offending accounts
                    are suspended or permanently banned.
                </p>

                <h2>4. Cooperation with Authorities</h2>
                <p>
                    We cooperate fully with law enforcement agencies. Confirmed CSAE content or incidents are reported
                    to the appropriate legal and child protection organizations, including the NCMEC when applicable.
                </p>

                <h2>5. Regular Reviews and Training</h2>
                <p>
                    Moderators and relevant staff receive regular training and updates on detecting and handling CSAE
                    content, aligned with industry standards and best practices.
                </p>
            </div>
        </div>
    );
};

export default CSAEPolicy;
