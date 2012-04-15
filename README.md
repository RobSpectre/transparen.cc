# transparen.cc

A social app proxy to give users transparency in how their social graph data is
used.

Created at [WSJ Data Transparency](http://datatransparency.wsj.com/).

## Summary

[transparen.cc](http://www.transparen.cc/) is a proof-of-concept for a proxy
service serving as a independent, transparent intermediator between social data
and the apps that want to use them.   It does this through three key ways:

* Social data proxy - transparen.cc sits between the social app and the social
  graph, logging all data requests.
* User audit log - users of transparen.cc-enabled social apps get a log listing
  every time such apps try to access their data, when it was accessed, what the
  app was asking for, and how much data it got.
* App profile - These data requests are anonymized and aggregated for an app,
  giving it a profile showing what kind of data it is _actually_ asking for and
  how often it asks for such.


## Problem Statement

The current social data authentication model is broken.
[OAuth](http://oauth.net/) and it's imitators succeeded in securing the
transport of social data between data providers and app developers, but failed
in creating a user and developer experience that would ensure that transport
would be useful.  In practice, the permissions paradigm commonly implemented by
social services produces a condition where users only know what apps _can_ do,
not what they _actually_ do and developers are forced to ask permission for what
they _might_ do instead of what they _should_ do.

For users, whenever we want to use a social application, we're presented with an
all-or-nothing decision before we see the benefit of the software.  We get a
list of a dozen different permissions that are described differently from
Facebook to Twitter to Foursquare and when we click "Allow" we get no further
visibility into how the data is being used.  

As developers, we are also shortchanged by this constraint.  Without a graceful
user experience for permissions escalation, we are forced to ask users for
permission for all the data we can conceive of ever using for fear of having to
ask for reauthorization as the scope of our apps grow to utilize a different
feature.  As media continues to converge, we can't simply ask for access to
photos for our photo app, as users will want those photos presented in the
context of their relationships or the events they attended or the activities
in which they participate.  

What apps have to ask to do does not jive with what they will do and as such
both users and app developers are poorly served.  The result is apps gaining
huge swaths of permissions they don't need for users that don't know what is
actually going on with their data.

While little will be done in the near-term to address this fundamental issue
with the way social app authorization works, we can borrow from some existing
web paradigms to engineer a mitigation.  Much like we rely on independent,
consumer-focused services like VeriSign for SSL certificates, PayPal for payment
processing, and Symantec for Anti-Virus scanning, a similar service could be developed
to intermediate the transfer of social data.  

transparen.cc is a proof-of-concept of that idea, aiming to provide users with
visibility and developers with credibility, producing a clearer picture of the
way our social data is exchanged.


## Credits

* [Rob Spectre](http://www.brooklynhacker.com/)
* [Mason Du](http://about.me/masondu)
* [Chris Carson](http://modernmediapartners.com)

## License

* [MIT License](http://www.opensource.org/licenses/MIT)


## Resources

* [Hacker
 League]
 (http://hackerleague.org/hackathons/wsj-data-transparency-code-a-thon/hacks/transparen-dot-cc)
