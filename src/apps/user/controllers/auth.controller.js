import { asyncHandler } from '../../../utils/asyncHandler.js';
import { ApiResponse } from '../../../utils/ApiResponse.js';
import { User } from '../../../models/user.model.js';
import axios from 'axios';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = '<http://localhost:3000/auth/google/callback>';

const initiatesGooleAuth = asyncHandler(async (req, res) => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});

const googleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post('<https://oauth2.googleapis.com/token>', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      '<https://www.googleapis.com/oauth2/v1/userinfo>',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    // Code to handle user authentication and retrieval using the profile data

    res.redirect('/');

  } catch (error) {
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    res.redirect('/login');
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});

export { initiatesGooleAuth, googleCallback, logout };
