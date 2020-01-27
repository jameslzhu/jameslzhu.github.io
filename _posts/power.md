---
layout: post
title:  "Systems of Power"
date:   2020-01-27 09:03:10 -0800
categories: jekyll update
---

Inspired by Nicky Case's writings on systems, I am taking a shot at describing
power:

> power - the ability for one actor to control others

We can try to build a model for how it behaves, built on a few assumptions:

- Every actor has some power, not necessarily equal.
- Actors may combine their power, either *cooperatively* or *coercively*.
- Actors may *give* their power to someone else, but can only *take* power
from someone *coercively*.

By *cooperatively*, we mean that both actors share the power.
By *coercively*, we mean that one actor controls the other's power.

Finally, we'll add two rules that will change everything:
- Actors can always *cooperate*.
- Actors can *coerce* others if they have sufficiently greater power

An actor can only be coerced by one person. For another to coerce them,
they must cooperate or coerce the original coercer.

How do we describe this, formally?

- Let $A$ be the set of actors.
- Define the following properties for every actor:
  - C(a): the set of all actors cooperating with a. Always contains a.
  - D(a): the actor coercing a. 
  - S(a): the set of all actors coerced by a.
  - P(a): the base power of an actor. May change over time, as power is taken from others.
  - Q(a): the total power of an actor. Calculated as the sum of all a in C(a) and S(a).
- Define four *actions* every actor may take, depending on P(a):
  - *cooperate(a, b)*: C(a) += b, C(b) += a
  - *coerce(a, b)*: if Q(b) >= Q(a) + K: D(b) = a, S(a) += b
  - *give(a, b, p)*: P(a) -= p; P(b) += p
  - *take(a, b, p)*: if b in S(A): P(a) += p; P(b) -= p

