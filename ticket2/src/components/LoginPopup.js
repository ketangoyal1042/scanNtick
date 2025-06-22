import { hideLoginPopup } from '@/store/slices/isLoggedinSlice';
import { useSelector, useDispatch } from 'react-redux';
import WrapperModal from './common/WrapperModal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/router';


const LoginPopup = () => {
    const show = useSelector((state) => state.login.showLoginPopup);
    const dispatch = useDispatch();
    const router = useRouter();
    const setLoginPopupOpen = () => {
        dispatch(hideLoginPopup());
    }

    if (!show) return null;

    return (
        <WrapperModal open={show} setOpen={setLoginPopupOpen}>
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Login Required, You must be logged in.
                </h3>
                <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={() => { router.push("/login"); dispatch(hideLoginPopup()) }}>
                        {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => dispatch(hideLoginPopup())}>
                        No, cancel
                    </Button>
                </div>
            </div>
        </WrapperModal>
    );
};

export default LoginPopup
