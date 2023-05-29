// Purpose: user routes, login, logout, signup, 
const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users
router.post('/', async (req, res) => {
    try {
