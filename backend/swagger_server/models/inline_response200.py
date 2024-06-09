# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from swagger_server.models.base_model_ import Model
from swagger_server import util


class InlineResponse200(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, message: str=None, token: str=None):  # noqa: E501
        """InlineResponse200 - a model defined in Swagger

        :param message: The message of this InlineResponse200.  # noqa: E501
        :type message: str
        :param token: The token of this InlineResponse200.  # noqa: E501
        :type token: str
        """
        self.swagger_types = {
            'message': str,
            'token': str
        }

        self.attribute_map = {
            'message': 'message',
            'token': 'token'
        }
        self._message = message
        self._token = token

    @classmethod
    def from_dict(cls, dikt) -> 'InlineResponse200':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The inline_response_200 of this InlineResponse200.  # noqa: E501
        :rtype: InlineResponse200
        """
        return util.deserialize_model(dikt, cls)

    @property
    def message(self) -> str:
        """Gets the message of this InlineResponse200.


        :return: The message of this InlineResponse200.
        :rtype: str
        """
        return self._message

    @message.setter
    def message(self, message: str):
        """Sets the message of this InlineResponse200.


        :param message: The message of this InlineResponse200.
        :type message: str
        """

        self._message = message

    @property
    def token(self) -> str:
        """Gets the token of this InlineResponse200.


        :return: The token of this InlineResponse200.
        :rtype: str
        """
        return self._token

    @token.setter
    def token(self, token: str):
        """Sets the token of this InlineResponse200.


        :param token: The token of this InlineResponse200.
        :type token: str
        """

        self._token = token
