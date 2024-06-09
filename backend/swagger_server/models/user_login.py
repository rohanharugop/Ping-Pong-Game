# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class UserLogin(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, username: str=None, password: str=None):  # noqa: E501
        """UserLogin - a model defined in Swagger

        :param username: The username of this UserLogin.  # noqa: E501
        :type username: str
        :param password: The password of this UserLogin.  # noqa: E501
        :type password: str
        """
        self.swagger_types = {
            'username': str,
            'password': str
        }

        self.attribute_map = {
            'username': 'username',
            'password': 'password'
        }
        self._username = username
        self._password = password

    @classmethod
    def from_dict(cls, dikt) -> 'UserLogin':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The UserLogin of this UserLogin.  # noqa: E501
        :rtype: UserLogin
        """
        return util.deserialize_model(dikt, cls)

    @property
    def username(self) -> str:
        """Gets the username of this UserLogin.


        :return: The username of this UserLogin.
        :rtype: str
        """
        return self._username

    @username.setter
    def username(self, username: str):
        """Sets the username of this UserLogin.


        :param username: The username of this UserLogin.
        :type username: str
        """
        if username is None:
            raise ValueError("Invalid value for `username`, must not be `None`")  # noqa: E501

        self._username = username

    @property
    def password(self) -> str:
        """Gets the password of this UserLogin.


        :return: The password of this UserLogin.
        :rtype: str
        """
        return self._password

    @password.setter
    def password(self, password: str):
        """Sets the password of this UserLogin.


        :param password: The password of this UserLogin.
        :type password: str
        """
        if password is None:
            raise ValueError("Invalid value for `password`, must not be `None`")  # noqa: E501

        self._password = password
