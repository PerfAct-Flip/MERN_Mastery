import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';

interface ProjectProps {
    onGoBack: () => void;
}

// 1. Define the shape of our form data and errors
interface FormData {
    name: string;
    email: string;
    password: string;
}

const FormValidation: React.FC<ProjectProps> = ({ onGoBack }) => {
    // 2. Initialize state with objects
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 3. The "Magic" Change Handler: updates state based on input 'name' attribute
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
        const {name, value } = e.target;
        setFormData( prev => ({...prev, [name]: value}))

        if(errors[name as keyof FormData]){
            setErrors(prev => ({...prev, [name]: ""}));
        }
    }
    const validate = ()=> {
        const newErrors: Partial<FormData> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) newErrors.name = "Name is required!";

        if (!formData.email){
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)){ 
            newErrors.email = 'invalid format of Email'
        }

        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length ===0
    }



    const handleSubmit = (e: FormEvent)=> {
        e.preventDefault();
        if(validate()){
            setIsSubmitted(true);
        }else {
            setIsSubmitted(false);
        }
    }

    return (
        <div className="flex flex-col items-center p-6 min-h-screen">
            <div className='w-full max-w-lg'>
                
                {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-200">
                        <CheckCircle2 className="w-5 h-5" /> Form submitted successfully!
                    </div>
                )}

                <form 
                // onSubmit={handleSubmit} 
                className='space-y-6'>
                    {/* Name Field */}
                    <div className='grid grid-cols-4 gap-4 items-center'>
                        <label className='text-sm font-semibold text-gray-700'>Full Name:</label>
                        <input
                            type="text"
                            name="name" // Matches key in formData
                            value={formData.name}
                            onChange={handleChange}
                            className={`col-span-3 p-3 rounded-xl border outline-none transition ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'}`}
                        />
                        {errors.name && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                    </div>

                    {/* Email Field */}
                    <div className='grid grid-cols-4 gap-4 items-center'>
                        <label className='text-sm font-semibold text-gray-700'>Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`col-span-3 p-3 rounded-xl border outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'}`}
                        />
                        {errors.email && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                    </div>

                    {/* Password Field */}
                    <div className='grid grid-cols-4 gap-4 items-center'>
                        <label className='text-sm font-semibold text-gray-700'>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`col-span-3 p-3 rounded-xl border outline-none transition ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'}`}
                        />
                        {errors.password && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            <button
                onClick={onGoBack}
                className="mt-8 px-6 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm"
            >
                <RotateCcw className="inline w-4 h-4 mr-2" />
                Back to Dashboard
            </button>
        </div>
    );
};
export default FormValidation;