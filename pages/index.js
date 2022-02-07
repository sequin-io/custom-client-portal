import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import LoginWithMagicLinks from './components/LoginWithMagicLinks';
import withSession from './lib/withSession';

export default function Home(props) {
    //This state holds the projects associated with the user
    const [clientProjects, setClientProjects] = useState(null);
    
    //This state contains the logged in status of the user
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //User's session details
    const { user } = props

    // Sets local isLoggedIn variable
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            getClientProjects();
        }
    }, []);

    // Logs a user out
    const logOut = async ()  => {
        setIsLoggedIn(false);
        
        const resp = await fetch('/api/logout', { method: 'POST' });
    };
    
    // Gets this client's projects when they're logged in
    const getClientProjects = async () => {
            const resp = await fetch("/api/projects", {
                method: 'POST',
                //Send the user's token and email in the request body
                body: JSON.stringify({
                    session_token: user.session_token,
                    email: user.email
                })
            });
            if (resp.status === 200) {
                setClientProjects(await resp.json());
            }
    } 

    // Allow clients to mark a project as complete
    const markProjectComplete = async (e) => {
        const completeProjectId = e.target.value;
        setClientProjects(clientProjects.map(project => {
            if (project.id === completeProjectId) {
                project.complete = true;
            }
            return project
        }));

        await fetch("/api/projects/" + completeProjectId, {
            method: "PUT",
            body: JSON.stringify({
                session_token: user.session_token
            })
        });
    };

    // Display the client portal page
    return (
        <div className={styles.container}>
            <Head>
                <title>Client Portal</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Your Client Portal</h1>
                {isLoggedIn ? (
                    <div>
                        {clientProjects ? (
                            <div className={styles.grid}>
                                {clientProjects.map(project =>
                                    <div className={styles.card} key={project.id}>
                                        <h3>{project.name}</h3>
                                        <img src={project.project_images[0]} style={{maxWidth: "100%"}} />
                                        <p>Led by {project.project_lead.name}</p>
                                        <p>Due on {project.due_date.split('T')[0]}</p>
                                        <p><input type="checkbox"
                                                  name="complete"
                                                  value={project.id}
                                                  onChange={markProjectComplete}
                                                  disabled={project.complete}
                                                  defaultChecked={!!project.complete} /> Project complete</p>
                                    </div>
                                )}
                            </div>
                        ) : (<p>You currently have no projects attached to this account.</p>)}
                        <p style={{textAlign: "center", cursor: "pointer"}} onClick={logOut}>Log Out</p>
                    </div>
                ): (<LoginWithMagicLinks styles={styles} />)}
            </main>
        </div>
    )
}

const getServerSidePropsHandler = async ({ req }) => {
    // Get the user's session based on the request
    const user = req.session.get('user') ?? null;
    const props = { user } ;
    return { props };
  };
  
export const getServerSideProps = withSession(getServerSidePropsHandler);