// @ts-nocheck
import * as af from './affiliate-network'
import * as cl from './click'
import * as tf from './traffic-source'
import * as ca from './campaign'
import * as of from './offer'
import * as gl from './global'

import affiliateNetwork = af.tds.affiliate_network
import trafficSource = tf.tds.traffic_source
import click = cl.tds.click
import campaign = ca.tds.campaign
import offer = of.tds.offer
import global = gl.tds.global

export { affiliateNetwork, trafficSource, click, campaign, offer, global }
