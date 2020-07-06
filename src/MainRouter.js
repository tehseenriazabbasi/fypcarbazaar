import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import signup from "./user/signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import Footer from "./core/footer";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import NewPost from "./Post/NewPost";
import BuyersAd from "./Post/buyersAd";
import SinglePost from "./Post/SinglePost"
import Preview from "./Post/preivewPost"
import EditPost from "./Post/EditPost"
import EditBuyerPost from "./Post/EditBuyerPost"
import ForgotPassword from "./user/ForgotPassword";
import PrivateRoute from "./auth/PrivateRoute";
import ResetPassword from "./user/ResetPassword";
import savePost from "./Post/savePost";
import saveBuyerPost from "./Post/SaveBuyer";
import UnsaveBuyerPost from "./Post/UnsaveBuyer";
import unsavePost from "./Post/unsavePost";
import admin from "./admin/Admin.js"
import UserReport from "./admin/UserReports"
import UserManagement from "./admin/UserManagement"
import AdsManagement from "./admin/AdsManagement";
import PostReports from  "./admin/PostReports"
import profileDetail from "./admin/profileDetail"
import postDetail from "./admin/postDetail"
import activePosts from "./admin/activePosts"
import deactivePosts from "./admin/deactivatedPosts"
import newUsers from "./admin/newUsers"
import scroll from "./Post/scroll";
import contactUs from "./contatcUs/contactUs"
import BuyersPosts from "./Post/BuyerPosts"
import Settings from "./settings/Settings"
import GuideLines from "./settings/GudieLines"
import VerifyAccount from "./user/verifyComp"
import SignupDealer from "./user/SignupDealer"
import pending from "./admin/pending"
import dealer_details from  "./admin/dealer_details"
import SingleBuyerPost from "./Post/SingleBuyerPost"
import reviews from "./review/review"
import newReview from "./review/newReview"
import Recommender from "./recommender/Recommender"
import analytics from "./admin/analytics"

import {
    CometChatConversationList,
    CometChatUserList,
    CometChatUnified,
    CometChatGroupList,
    CometChatUserListScreen,
    CometChatConversationListScreen,
    CometChatGroupListScreen
} from './lib/CometChat';
import KitchenSinkApp from './defaultPages/KitchenSinkApp'
import HomePage from './defaultPages/HomePage';
import AllComponents from './defaultPages/AllComponents';


const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>



            <Route path="/login">
                <KitchenSinkApp></KitchenSinkApp>
            </Route>
            <Route path="/inbox">
                <CometChatUnified></CometChatUnified>
            </Route>
            <Route path="/contact-list">
                <CometChatUserList></CometChatUserList>
            </Route>
            <Route path="/group-list">
                <CometChatGroupList></CometChatGroupList>
            </Route>
            <Route path="/conversations-list">
                <CometChatConversationList></CometChatConversationList>
            </Route>
            <Route path="/contact-screen">
                <CometChatUserListScreen></CometChatUserListScreen>
            </Route>
            <Route path="/conversation-screen">
                <CometChatConversationListScreen></CometChatConversationListScreen>
            </Route>
            <Route path="/group-screen">
                <CometChatGroupListScreen></CometChatGroupListScreen>
            </Route>
            <Route path="/components">
                <AllComponents></AllComponents>
            </Route>


            <Route  path="/car/review" component={reviews} />
            <Route  path="/admin/analytics" component={analytics} />
            <Route  path="/car/new_review" component={newReview} />
            <Route  path="/car/recommendations" component={Recommender} />

            <Route  path="/contact-us" component={contactUs} />
            <Route  path="/scroll" component={scroll} />
            <Route  path="/signup" component={signup} />
            <Route  path="/signup_dealer" component={SignupDealer} />
            <Route  path="/SignIn" component={Signin} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:resetPasswordToken" component={ResetPassword}
            />
            <Route path="/verify-account/:verifyAccountToken" component={VerifyAccount}
            />
            <Route  path="/users" component={Users} />
            <Route  path="/BuyerPosts" component={BuyersPosts} />
            <PrivateRoute  path="/user/:userId" component={Profile}/>
            <PrivateRoute  path="/userSetting/" component={Settings}/>
            <PrivateRoute  path="/Guidelines/" component={GuideLines}/>
            <PrivateRoute  path="/profile_details/:userId" component={profileDetail}/>
            <PrivateRoute  path="/dealer_details/:userId" component={dealer_details}/>
            <PrivateRoute  path="/u/edit/:userId" component={EditProfile}/>
            <PrivateRoute  path="/post/edit/:postId" component={EditPost}/>
            <PrivateRoute  path="/post/b_edit/:postId" component={EditBuyerPost}/>
            <PrivateRoute  path="/post/create" component={NewPost}/>
            <PrivateRoute  path="/post/create_buyer" component={BuyersAd}/>
            <Route  path="/post/:postId" component={SinglePost} />
            <Route  path="/postpreview/:postId" component={Preview} />
            <Route  path="/b_post/:bpostId" component={SingleBuyerPost} />

            <Route  path="/post_details/:postId" component={postDetail} />
            <Route  path="/savePost/:postId" component={savePost} />
            <Route  path="/saveBuyerPost/:postId" component={saveBuyerPost} />
            <Route  path="/unsavePost/:postId" component={unsavePost} />
            <Route  path="/unsaveBuyerPost/:postId" component={UnsaveBuyerPost} />
            <PrivateRoute exact path="/admin" component={admin} />
            <PrivateRoute exact path="/userReports" component={UserReport} />
            <PrivateRoute exact path="/userManagement" component={UserManagement} />
            <PrivateRoute exact path="/AdsManagement" component={AdsManagement} />
            <PrivateRoute exact path="/postReports" component={PostReports} />
            <PrivateRoute exact path="/activePosts" component={activePosts} />
            <PrivateRoute exact path="/deactivatedPosts" component={deactivePosts} />
            <PrivateRoute exact path="/newMembers" component={newUsers} />
            <PrivateRoute exact path="/pendingUsers" component={pending} />
            <Route  path="/" component={Home} />
        </Switch>
        <Footer/>
    </div>
);

export default MainRouter;
