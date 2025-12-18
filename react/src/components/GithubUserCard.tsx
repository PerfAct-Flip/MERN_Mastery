import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, RotateCcw, FileText } from 'lucide-react';

interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string | null;      // Some users don't set a display name
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;      // ISO Date string
    updated_at: string;      // ISO Date string
}
interface ProjectProps {
    onGoBack: () => void;
}

const GithubUserCard: React.FC<ProjectProps> = ({ onGoBack }) => {
    const [userName, setUserName] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userName.trim()) {
            setUser(userName);
        }
    }

    useEffect(() => {
        if (!user) return;
        const controller = new AbortController();
        const GetGithubUserData = async () => {
            try {

                const API = `https://api.github.com/users/${user}`;
                // const API = `https://api.github.com/users/perfact-flip`;
                const response = await axios.get<GitHubUser>(API, { signal: controller.signal });
                setUserData(response.data);
                setError(null);

            } catch (err: any) {
                if (axios.isCancel(err)) {
                    console.log('request cancelled')
                } else {
                    setError('Failed to fetch data.')
                }
            } finally {
                setLoading(false);
            }
        }
        GetGithubUserData();
        // Cleanup function
        return () => controller.abort();
    }, [user])

    return (
        <div className="flex flex-col items-center p-6 min-h-screen w-full max-w-4xl">
            <div className="flex flex-col justify-between items-center mb-8 min-w-full">

                    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                        <label htmlFor="userName" className='font-bold'>Your Username:</label>
                        <input
                            type="text"
                            placeholder='Enter username'
                            className='border border-gray-200 rounded-2xl p-2 bg-slate-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150'
                            value={userName}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"

                        >
                            Submit
                        </button>
                    </form>
            </div>

            <div>
                {(loading && error )? (
                    <p>Loading...</p>
                ) : (
                    <div className='bg-gray-100 shadow-2xl min-w-full m-10 p-5 rounded-2xl grid grid-cols-12' >
                    <div className='col-span-4'>
                        <div>
                            <img src={userData?.avatar_url} alt="Profile" className='h-[100px] w-[100px] rounded-full' />
                        </div>
                        <h1 className='text-blue-600 font-semibold text-2xl'>{userData?.name} </h1>

                    </div>
                    <div className='col-span-8 flex flex-col text-slate-500 justify-center text-xl gap-2'>
                        <p>{userData?.bio}</p>
                        <span>{userData?.login}</span>
                        <span> <span className='text-slate-600'>{userData?.public_repos}</span> Public Repos </span>
                    </div>
                </div>
                    
                )}
            </div>

            <button
                onClick={onGoBack}
                className="mt-12 px-6 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center mx-auto"
            >
                <RotateCcw className="inline w-4 h-4 mr-2" />
                Back to Dashboard
            </button>

        </div>
    );
};

export default GithubUserCard;